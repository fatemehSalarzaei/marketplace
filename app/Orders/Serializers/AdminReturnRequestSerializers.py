from django.contrib.auth import get_user_model
from rest_framework import serializers

from Orders.models import OrderItem, ReturnRequest, Order
from Products.models import ProductVariant

User = get_user_model()

# ---- User Serializer ----
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number']


# ---- Product Variant Serializer ----
class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'is_active']


# ---- Order Item Serializer ----
class OrderItemSerializer(serializers.ModelSerializer):
    variant = ProductVariantSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'title_snapshot', 'variant', 'quantity', 'unit_price', 'total_price']


# ---- Order Summary Serializer ----
class OrderSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'total_price', 'final_price',
            'delivery_price', 'is_paid', 'created_at',
        ]


# ---- Summary List Serializer ----
class ReturnRequestSummarySerializer(serializers.ModelSerializer):
    user = AdminUserSerializer(read_only=True)
    item_title = serializers.CharField(source='order_item.title_snapshot', read_only=True)
    order_id = serializers.IntegerField(source='order.id', read_only=True)

    class Meta:
        model = ReturnRequest
        fields = ['id', 'order_id', 'item_title', 'user', 'status', 'requested_at']


# ---- Detail View Serializer ----
class ReturnRequestDetailSerializer(serializers.ModelSerializer):
    user = AdminUserSerializer(read_only=True)
    order_items = OrderItemSerializer(source='order.items', many=True, read_only=True)
    order = OrderSummarySerializer()

    class Meta:
        model = ReturnRequest
        fields = [
            'id', 'status', 'reason', 'requested_at', 'processed_at',
            'user', 'order', 'order_item', 'order_items'
        ]
