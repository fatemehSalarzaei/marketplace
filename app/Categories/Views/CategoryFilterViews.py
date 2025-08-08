from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.db.models import Min, Max

from Products.models import Product, ProductVariant
from Categories.models import Category
from Categories.Serializers import FilterOptionSerializer


class CategoryFilterAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, category_slug):
        # گرفتن دسته‌بندی و تمام زیرشاخه‌ها
        try:
            category = Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            return Response(
                {"error": "دسته‌بندی یافت نشد."},
                status=status.HTTP_404_NOT_FOUND
            )

        def get_all_children(cat):
            children = list(cat.children.all())
            for child in children:
                children.extend(get_all_children(child))
            return children

        descendant_categories = get_all_children(category)
        category_ids = [category.id] + [c.id for c in descendant_categories]

        # گرفتن محصولات با پیش‌بارگذاری روابط
        products = (
            Product.objects.filter(
                category_id__in=category_ids,
                status='published'
            )
            .select_related('brand')
            .prefetch_related(
                'variants',
                'variants__variant_attributes',
                'variants__variant_attributes__attribute',
                'variants__variant_attributes__predefined_value',
                # 'variants__variant_attributes__value',
            )
        )

        attribute_data = {}
        brand_filters = set()

        for product in products:
            if product.brand:
                brand_filters.add((product.brand.id, product.brand.name))

            for variant in product.variants.filter(is_active=True):
                for va in variant.variant_attributes.all():
                    attr = va.attribute
                    attr_slug = attr.slug
                    attr_title = attr.name
                    value = (
                        va.predefined_value.value
                        if va.predefined_value else va.value
                    )

                    if not value:
                        continue

                    if attr_slug not in attribute_data:
                        attribute_data[attr_slug] = {
                            "slug": attr_slug,
                            "title": attr_title,
                            "values": set()
                        }
                    attribute_data[attr_slug]["values"].add(value)

        # ساخت فیلترها
        filters = []

        # ویژگی‌ها
        for attr in attribute_data.values():
            filters.append({
                "slug": attr["slug"],
                "title": attr["title"],
                "values": sorted(attr["values"])
            })

        # برند
        if brand_filters:
            filters.append({
                "slug": "brand",
                "title": "برند",
                "values": [
                    {"id": b_id, "name": b_name}
                    for b_id, b_name in sorted(brand_filters, key=lambda x: x[1])
                ]
            })

        # قیمت و موجودی
        if products.exists():
            prices = ProductVariant.objects.filter(
                product__in=products
            ).aggregate(
                min_price=Min('price'),
                max_price=Max('price')
            )
            filters.append({
                "slug": "price",
                "title": "قیمت",
                "values": {
                    "min": prices["min_price"] or 0,
                    "max": prices["max_price"] or 0,
                }
            })
            filters.append({
                "slug": "stock_status",
                "title": "وضعیت موجودی",
                "values": ["موجود", "ناموجود"]
            })

        serializer = FilterOptionSerializer(filters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
