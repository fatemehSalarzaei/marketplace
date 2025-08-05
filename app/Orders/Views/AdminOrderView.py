from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework import generics, filters, status
from django_filters.rest_framework import DjangoFilterBackend

from Orders.models import Order
from Orders.Serializers import OrderAdminSerializer , AdminOrderDetailSerializer

from app .permissions import HasModelPermission 

class AdminOrderListAPIView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]
    serializer_class = OrderAdminSerializer
    queryset = Order.objects.all().order_by('-created_at')

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # فیلتر بر اساس این فیلدها فعال است
    filterset_fields = ['status', 'is_paid', 'has_return_request', 'is_refunded']
    
    # جستجو بر اساس این فیلدها انجام می‌شود
    search_fields = ['order_number', 'user__first_name', 'user__last_name', 'user__email']
    
    # امکان مرتب‌سازی بر اساس این فیلدها وجود دارد
    ordering_fields = ['created_at', 'final_price', 'delivery_price']

class AdminOrderDetailAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({"detail": "سفارش یافت نشد"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AdminOrderDetailSerializer(order , context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
