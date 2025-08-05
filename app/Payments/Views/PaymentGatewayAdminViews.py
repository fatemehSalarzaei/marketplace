# payment_gateway/views.py
from rest_framework import viewsets, permissions
from Payments.models import PaymentGateway
from Payments.Serializers import PaymentGatewaySerializer

from app .permissions import HasModelPermission 

class PaymentGatewayViewSet(viewsets.ModelViewSet):
    queryset = PaymentGateway.objects.all()
    serializer_class = PaymentGatewaySerializer
    permission_classes = [permissions.IsAdminUser , HasModelPermission]  # فقط ادمین‌ها اجازه دارند
