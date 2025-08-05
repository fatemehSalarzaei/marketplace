# payment_gateway/serializers.py
from rest_framework import serializers
from Payments.models import PaymentGateway

class PaymentGatewaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentGateway
        fields = '__all__'
