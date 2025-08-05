from rest_framework import serializers
from Products.models import StockAlert

class StockAlertSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='variant.product.name', read_only=True)
    sku = serializers.CharField(source='variant.sku', read_only=True)

    class Meta:
        model = StockAlert
        fields = ['id', 'product_name', 'sku', 'message', 'triggered_at']
