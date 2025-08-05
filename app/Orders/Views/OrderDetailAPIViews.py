from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from Orders.models import Order
from Orders.Serializers import OrderDetailSerializer
from drf_spectacular.utils import extend_schema

@extend_schema(
    responses=OrderDetailSerializer,
    tags=["Orders"],  # 👈 برای دسته‌بندی در Swagger
)
class OrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        serializer = OrderDetailSerializer(order, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
