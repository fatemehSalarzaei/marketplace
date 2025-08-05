from rest_framework import serializers
from Orders.models import Order, OrderItem

class OrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'total_price', 'final_price',
            'delivery_price', 'is_paid', 'created_at', 
        ]
