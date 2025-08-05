from rest_framework import serializers

class CreateOrderSerializer(serializers.Serializer):
    address_id = serializers.IntegerField()
    shipping_method_id = serializers.IntegerField()
    coupon_code = serializers.CharField(required=False, allow_blank=True)
    delivery_time = serializers.DateTimeField(required=False)  

