from rest_framework import generics, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.timezone import now

from Payments.models import Payment
from Payments.Serializers import PaymentAdminSerializer  
from django.db.models import Sum, Count, Q

from app .permissions import HasModelPermission 

class AdminPaymentReportAPIView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]
    serializer_class = PaymentAdminSerializer
    queryset = Payment.objects.select_related('user', 'invoice', 'payment_gateway').all().order_by('-payment_date')

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'payment_gateway', 'currency', 'refunded', 'is_manual_review_required']
    search_fields = ['transaction_id', 'user__email', 'user__first_name', 'user__last_name']
    ordering_fields = ['payment_date', 'amount']

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        # آمار کلی برای داشبورد
        total_success = Payment.objects.filter(status='success').aggregate(total=Sum('amount'))['total'] or 0
        total_failed = Payment.objects.filter(status='failed').count()
        total_refunded = Payment.objects.filter(status='refunded').aggregate(total=Sum('amount'))['total'] or 0
        pending_count = Payment.objects.filter(status='pending').count()

        response.data = {
            "summary": {
                "total_success_amount": total_success,
                "total_failed_count": total_failed,
                "total_refunded_amount": total_refunded,
                "pending_count": pending_count,
            },
            "payments": response.data
        }
        return response
