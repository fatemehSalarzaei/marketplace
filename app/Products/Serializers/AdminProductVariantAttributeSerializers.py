# serializers/admin/product_variant_attribute.py
from rest_framework import serializers
from Products.models import ProductVariantAttribute

class AdminProductVariantAttributeSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute_value.attribute.name', read_only=True)

    class Meta:
        model = ProductVariantAttribute
        fields = ['id', 'product_variant', 'attribute_value', 'attribute_name']
