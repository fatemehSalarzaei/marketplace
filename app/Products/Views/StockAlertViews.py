from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django_filters import filters

from Products.models import StockAlert
from Products.Serializers import StockAlertSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class InlineStockAlertFilter(FilterSet):
    product_name = filters.CharFilter(field_name='variant__product__name', lookup_expr='icontains')
    sku = filters.CharFilter(field_name='variant__sku', lookup_expr='icontains')
    triggered_at = filters.DateFromToRangeFilter()

    class Meta:
        model = StockAlert
        fields = ['product_name', 'sku', 'triggered_at']


class StockAlertListAPIView(generics.ListAPIView):
    queryset = StockAlert.objects.select_related('variant__product').order_by('-triggered_at')
    serializer_class = StockAlertSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = InlineStockAlertFilter
