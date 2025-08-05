# Orders/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from Orders.Serializers import UpdateOrderStatusSerializer
from app.permissions import HasModelPermission

class AdminUpdateOrderStatusAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]

    @extend_schema(
        request=UpdateOrderStatusSerializer,
        responses={
            200: OpenApiResponse(response=None, description="وضعیت سفارش با موفقیت به‌روزرسانی شد"),
            400: OpenApiResponse(response=None, description="درخواست نامعتبر"),
            404: OpenApiResponse(response=None, description="سفارش مورد نظر یافت نشد")
        },
        description="تغییر وضعیت سفارش و ثبت اطلاعات ارسال توسط ادمین"
    )
    def put(self, request, order_id):
        serializer = UpdateOrderStatusSerializer(data=request.data)
        if serializer.is_valid():
            updated = serializer.update_order_status(order_id, serializer.validated_data)
            if updated:
                return Response({"message": "وضعیت سفارش با موفقیت به‌روزرسانی شد"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "سفارش یافت نشد"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
