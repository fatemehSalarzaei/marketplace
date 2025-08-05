from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from Orders.Serializers import CreateOrderSerializer
from Orders.services import create_order_logic  


class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        request=CreateOrderSerializer,
        responses={
            201: OpenApiResponse(
                response=None,
                description="سفارش با موفقیت ایجاد شد"
            ),
            400: OpenApiResponse(
                response=None,
                description="درخواست نامعتبر"
            ),
            404: OpenApiResponse(
                response=None,
                description="کاربر یا اطلاعات وارد شده یافت نشد"
            )
        },
        description="ایجاد سفارش جدید از روی سبد خرید کاربر"
    )
    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            order = create_order_logic(request.user, serializer.validated_data)
            return Response({"detail": "سفارش با موفقیت ثبت شد", "order_id": order.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
