# admin_views.py
from rest_framework import generics, permissions, filters

from drf_spectacular.utils import extend_schema, OpenApiResponse
from django_filters.rest_framework import DjangoFilterBackend

from Reviews.models import OrderItemReview
from Reviews.Serializers import AdminOrderItemReviewSerializer

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff  # فقط برای ادمین

class AdminOrderItemReviewListAPIView(generics.ListAPIView):
    queryset = OrderItemReview.objects.select_related('order_item__variant__product', 'user')
    serializer_class = AdminOrderItemReviewSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['user__first_name', 'user__last_name', 'user__phone_number', 'order_item__variant__product__title']

    @extend_schema(
        responses={200: OpenApiResponse(description="لیست نظرات کاربران برای آیتم‌های سفارش")}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
