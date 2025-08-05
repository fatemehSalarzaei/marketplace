# admin_serializers.py
from rest_framework import serializers
from Reviews.models import OrderItemReview
from django.contrib.auth import get_user_model

User = get_user_model()

class AdminUserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'phone_number']
        
class AdminOrderItemReviewSerializer(serializers.ModelSerializer):
    user = AdminUserSummarySerializer(read_only=True)
    order_item_id = serializers.IntegerField(source='order_item.id', read_only=True)
    product_title = serializers.CharField(source='order_item.variant.product.title', read_only=True)

    class Meta:
        model = OrderItemReview
        fields = ['id', 'order_item_id', 'product_title', 'user', 'rating', 'comment', 'created_at']
