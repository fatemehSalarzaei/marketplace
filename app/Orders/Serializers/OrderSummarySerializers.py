from rest_framework import serializers
from django.contrib.auth import get_user_model


from Orders.models import Order , OrderItem



User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number']  # فرض می‌کنیم فیلد phone_number در مدل User هست

class OrderItemSerializer(serializers.ModelSerializer):
    variant = serializers.StringRelatedField()

    class Meta:
        model = OrderItem
        fields = ['title_snapshot', 'variant', 'quantity', 'unit_price', 'total_price']

class OrderSummarySerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Order
        fields = ['id', 'order_number', 'status', 'total_price', 'final_price', 'created_at', 'user']

class OrderDetail2Serializer(serializers.ModelSerializer):
    user = UserSerializer()
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'total_price', 'final_price', 'delivery_price',
            'is_paid', 'created_at', 'user', 'items'
        ]
