from rest_framework import serializers
from Orders.models import Order, OrderItem
from Accounts.models import User  

class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['title_snapshot', 'variant', 'quantity', 'unit_price', 'total_price', 'is_returnable', 'returned_quantity']

class OrderAdminSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = UserSimpleSerializer(read_only=True)  # جایگزین StringRelatedField

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'status', 'total_price', 'final_price', 'delivery_price',
            'is_paid', 'has_return_request', 'is_refunded', 'created_at', 'items'
        ]
