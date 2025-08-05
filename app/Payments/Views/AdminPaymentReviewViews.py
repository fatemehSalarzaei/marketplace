from rest_framework import generics, permissions
from Payments.models import Payment
from Payments.Serializers import AdminPaymentReviewSerializer

from app .permissions import HasModelPermission 

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)

class AdminPaymentReviewAPIView(generics.UpdateAPIView):
    serializer_class = AdminPaymentReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser , HasModelPermission]

    def get_queryset(self):
        # فقط پرداخت‌هایی که رسید آپلود شده و نیاز به بررسی دستی دارند
        return Payment.objects.filter(is_manual_review_required=True)
