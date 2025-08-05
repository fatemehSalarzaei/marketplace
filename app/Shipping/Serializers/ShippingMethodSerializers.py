from rest_framework import serializers
from Shipping.models import ShippingMethod

class ShippingMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingMethod
        fields = ['id', 'name', 'description', 'cost', 'min_estimated_days', 
                  'max_estimated_days', 'active']
        read_only_fields = ['id']
