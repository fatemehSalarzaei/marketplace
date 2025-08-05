# serializers.py
from rest_framework import serializers
from Reviews.models import OrderItemReview

class OrderItemReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemReview
        fields = ['order_item', 'rating', 'comment']

    def validate_order_item(self, value):
        user = self.context['request'].user
        if value.order.user != user:
            raise serializers.ValidationError("شما اجازه ثبت نظر برای این آیتم را ندارید.")
        if hasattr(value, 'review'):
            raise serializers.ValidationError("برای این آیتم قبلاً نظری ثبت شده است.")
        return value
