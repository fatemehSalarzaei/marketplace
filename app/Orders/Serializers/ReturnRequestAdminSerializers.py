from rest_framework import serializers
from Orders.models import ReturnRequest

class ReturnRequestAdminSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='order.id', read_only=True)
    order_item_id = serializers.IntegerField(source='order_item.id', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = ReturnRequest
        fields = ['id', 'user_email', 'order_id', 'order_item_id', 'reason', 'status', 'requested_at', 'processed_at']
        read_only_fields = ['requested_at', 'user_email', 'order_id', 'order_item_id']
