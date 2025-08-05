from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from drf_spectacular.utils import extend_schema, OpenApiResponse
from django.conf import settings
from django.db.models import Q

from Orders.models import Order
from Orders.Serializers import OrderSummarySerializer , OrderDetailSerializer

from app .permissions import HasModelPermission 

class AdminOrderReportAPIView(APIView):
    permission_classes = [IsAdminUser, HasModelPermission]

    @extend_schema(
        parameters=[
            {
                "name": "status",
                "required": False,
                "type": "string",
                "description": "فیلتر بر اساس وضعیت سفارش"
            },
            {
                "name": "first_name",
                "required": False,
                "type": "string",
                "description": "جستجو بر اساس نام کوچک کاربر"
            },
            {
                "name": "last_name",
                "required": False,
                "type": "string",
                "description": "جستجو بر اساس نام خانوادگی کاربر"
            },
            {
                "name": "phone_number",
                "required": False,
                "type": "string",
                "description": "جستجو بر اساس شماره تماس کاربر"
            },
            {
                "name": "start_date",
                "required": False,
                "type": "string",
                "format": "date",
                "description": "تاریخ شروع برای فیلتر سفارش‌ها (yyyy-mm-dd)"
            },
            {
                "name": "end_date",
                "required": False,
                "type": "string",
                "format": "date",
                "description": "تاریخ پایان برای فیلتر سفارش‌ها (yyyy-mm-dd)"
            },
        ],
        responses={
            200: OrderSummarySerializer(many=True),
        },
        description="گزارش‌گیری سفارشات با قابلیت فیلتر و جستجو برای ادمین"
    )
    def get(self, request, pk=None):
        if pk is not None:
            try:
                order = Order.objects.select_related('user').prefetch_related('items').get(pk=pk)
            except Order.DoesNotExist:
                return Response({'detail': 'سفارش یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

            serializer = OrderDetailSerializer(order)
            return Response(serializer.data)

        status_filter = request.query_params.get('status')
        first_name = request.query_params.get('first_name')
        last_name = request.query_params.get('last_name')
        phone_number = request.query_params.get('phone_number')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        queryset = Order.objects.select_related('user').all()

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        if first_name:
            queryset = queryset.filter(user__first_name__icontains=first_name)

        if last_name:
            queryset = queryset.filter(user__last_name__icontains=last_name)

        if phone_number:
            queryset = queryset.filter(user__phone_number__icontains=phone_number)

        if start_date:
            queryset = queryset.filter(created_at__date__gte=start_date)

        if end_date:
            queryset = queryset.filter(created_at__date__lte=end_date)

        serializer = OrderSummarySerializer(queryset, many=True)
        return Response(serializer.data)
