from django_filters import rest_framework as filters
from Products.models import Product
from Categories.models import Category
from django.db.models import Min, Max

class CharInFilter(filters.BaseInFilter, filters.CharFilter):
    pass

class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    category = filters.NumberFilter(method='filter_by_category_and_children')
    category_slug = filters.CharFilter(method='filter_by_category_slug')
    brand = CharInFilter(field_name='brand__id', lookup_expr='in')  # برند با آیدی (عدد)
    status = filters.CharFilter()
    availability_status = filters.CharFilter(method='filter_by_availability_status')
    attribute = filters.CharFilter(method='filter_by_attribute')
    min_price = filters.NumberFilter(method='filter_by_min_price')
    max_price = filters.NumberFilter(method='filter_by_max_price')

    class Meta:
        model = Product
        fields = [
            'name', 'category', 'category_slug', 'brand', 'status',
            'availability_status', 'attribute', 'min_price', 'max_price'
        ]

    def filter_by_category_and_children(self, queryset, name, value):
        try:
            selected_category = Category.objects.get(id=value)
        except Category.DoesNotExist:
            return queryset.none()

        category_ids = self.get_all_subcategory_ids(selected_category)
        return queryset.filter(category__id__in=category_ids)

    def filter_by_category_slug(self, queryset, name, value):
        try:
            selected_category = Category.objects.get(slug=value)
        except Category.DoesNotExist:
            return queryset.none()

        category_ids = self.get_all_subcategory_ids(selected_category)
        return queryset.filter(category__id__in=category_ids)

    def get_all_subcategory_ids(self, category):
        ids = [category.id]
        for child in category.children.all():
            ids.extend(self.get_all_subcategory_ids(child))
        return ids

    def filter_by_attribute(self, queryset, name, value):
        for pair in value.split(','):
            if ':' not in pair:
                continue
            attr_key, val_key = pair.split(':')
            queryset = queryset.filter(
                variants__variant_attributes__attribute_value__attribute__slug=attr_key.strip(),
                variants__variant_attributes__attribute_value__value__iexact=val_key.strip()
            )
        return queryset.distinct()

    def filter_by_availability_status(self, queryset, name, value):
        values = value.split(',')
        if 'in_stock' in values:
            queryset = queryset.filter(variants__stock__gt=0)
        if 'out_of_stock' in values:
            queryset = queryset.filter(variants__stock=0)
        return queryset.distinct()

    def filter_by_min_price(self, queryset, name, value):
        return queryset.annotate(min_price=Min('variants__price')).filter(min_price__gte=value)

    def filter_by_max_price(self, queryset, name, value):
        return queryset.annotate(max_price=Min('variants__price')).filter(max_price__lte=value)
