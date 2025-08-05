# Products/api_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from Products.models import Product, ProductAttributeValue
from Attributes.models import Attribute
from Categories.models import Category


class FilterListAPIView(APIView):
    def get(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        products = Product.objects.filter(category=category)

        attribute_values = ProductAttributeValue.objects.filter(product__in=products).select_related('attribute', 'predefined_value')
        
        filters = {}

        for attr_val in attribute_values:
            attr_name = attr_val.attribute.name
            value = attr_val.predefined_value.value if attr_val.predefined_value else attr_val.value
            if not value:
                continue
            if attr_name not in filters:
                filters[attr_name] = set()
            filters[attr_name].add(value)

        filters = {k: list(v) for k, v in filters.items()}

        return Response({
            "category": category.name,
            "filters": filters
        }, status=status.HTTP_200_OK)
