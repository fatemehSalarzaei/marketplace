# serializers/admin/product_attribute_value.py
from rest_framework import serializers
from Products.models import ProductAttributeValue

class AdminProductAttributeValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute.name', read_only=True)

    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'product', 'attribute', 'attribute_name', 'predefined_value', 'value']
