from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from Orders.models import Order
from Orders.Serializers import OrderListSerializer

class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_paid']
    search_fields = ['order_number']
    ordering_fields = ['created_at', 'final_price']
    ordering = ['-created_at']

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
