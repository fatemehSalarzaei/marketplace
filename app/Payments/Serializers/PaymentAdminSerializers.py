from rest_framework import serializers
from Payments.models import Payment

class PaymentAdminSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    gateway_name = serializers.CharField(source='payment_gateway.name', read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'user_full_name', 'gateway_name', 'status', 'amount', 'currency',
            'transaction_id', 'payment_date', 'refunded', 'is_approved_by_admin'
        ]
