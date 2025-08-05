from rest_framework import generics
from Payments.models import PaymentGateway
from Payments.Serializers import PaymentGatewayPublicSerializer

class PublicPaymentGatewayListView(generics.ListAPIView):
    queryset = PaymentGateway.objects.filter(is_active=True)
    serializer_class = PaymentGatewayPublicSerializer
