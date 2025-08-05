from rest_framework import serializers
from Payments.models import PaymentGateway

class PaymentGatewayPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentGateway
        fields = ['id', 'name', 'icon' , 'description' , 'api_url']  
