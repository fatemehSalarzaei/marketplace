# serializers/admin/product_variant.py
from rest_framework import serializers
from Products.models import ProductVariant

class AdminProductVariantSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'product', 'product_name', 'sku', 'price', 'stock',
            'is_active', 'image', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
