from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from Products.models import Product, ProductVariant
from Categories.models import Category
from Categories.Serializers import FilterOptionSerializer
from django.db import models


class CategoryFilterAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, category_slug):
        try:
            category = Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            return Response({"error": "دسته‌بندی یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        def get_all_children(cat):
            children = list(cat.children.all())
            all_subs = []
            for child in children:
                all_subs.append(child)
                all_subs += get_all_children(child)
            return all_subs

        descendant_categories = get_all_children(category)
        category_ids = [category.id] + [c.id for c in descendant_categories]

        products = Product.objects.filter(
            category_id__in=category_ids,
            status='published'
        ).prefetch_related(
            'variants__variant_attributes__attribute_value__attribute',
            'brand'
        )

        attribute_filters = []
        brand_filters = set()
        attribute_data = {}

        for product in products:
            if product.brand:
                brand_filters.add((product.brand.id, product.brand.name))

            for variant in product.variants.filter(is_active=True):
                for va in variant.variant_attributes.select_related("attribute_value", "attribute_value__attribute"):
                    attr = va.attribute_value.attribute
                    attr_slug = attr.slug
                    attr_title = attr.name
                    value = va.attribute_value.value

                    if attr_slug not in attribute_data:
                        attribute_data[attr_slug] = {
                            "slug": attr_slug,
                            "title": attr_title,
                            "values": set()
                        }
                    attribute_data[attr_slug]["values"].add(value)

        for attr in attribute_data.values():
            attribute_filters.append({
                "slug": attr["slug"],
                "title": attr["title"],
                "values": sorted(list(attr["values"]))
            })

        filters = []

        if attribute_filters:
            filters.extend(attribute_filters)

        if brand_filters:
            filters.append({
                "slug": "brand",
                "title": "برند",
                "values": [{"id": b_id, "name": b_name} for b_id, b_name in sorted(brand_filters, key=lambda x: x[1])]
            })

        if products.exists():
            prices = ProductVariant.objects.filter(product__in=products).aggregate(
                min_price=models.Min('price'),
                max_price=models.Max('price')
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
