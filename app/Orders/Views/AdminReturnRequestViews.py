from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from django.utils import timezone
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination

from Orders.models import ReturnRequest
from Orders.Serializers import ReturnRequestDetailSerializer, ReturnRequestSummarySerializer
from app.permissions import HasModelPermission


class AdminReturnRequestAPIView(APIView):    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]

    @extend_schema(
        parameters=[
            {
                "name": "status",
                "required": False,
                "type": "string",
                "description": "فیلتر بر اساس وضعیت درخواست (مثلاً pending یا approved)"
            },
            {
                "name": "search",
                "required": False,
                "type": "string",
                "description": "جستجو بر اساس نام، نام خانوادگی، شماره تماس یا شماره سفارش"
            },
            {
                "name": "page",
                "required": False,
                "type": "integer",
                "description": "شماره صفحه برای صفحه‌بندی"
            },
            {
                "name": "page_size",
                "required": False,
                "type": "integer",
                "description": "تعداد آیتم در هر صفحه"
            },
        ],
        responses={
            200: ReturnRequestSummarySerializer(many=True),
        },
        description="دریافت لیست بازگشت سفارش‌ها برای ادمین با قابلیت فیلتر، جستجو و صفحه‌بندی"
    )
    def get(self, request, pk=None):
        if pk is not None:
            try:
                instance = ReturnRequest.objects.select_related('user', 'order', 'order_item').get(pk=pk)
            except ReturnRequest.DoesNotExist:
                return Response({'detail': 'درخواست یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

            serializer = ReturnRequestDetailSerializer(instance)
            return Response(serializer.data)

        status_filter = request.query_params.get('status')
        search = request.query_params.get('search')

        queryset = ReturnRequest.objects.select_related('user', 'order', 'order_item').all()

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        if search:
            queryset = queryset.filter(
                Q(user__first_name__icontains=search) |
                Q(user__last_name__icontains=search) |
                Q(user__phone_number__icontains=search) |
                Q(order__order_number__icontains=search)
            )

        paginator = PageNumberPagination()
        paginator.page_size = request.query_params.get('page_size', 10)
        result_page = paginator.paginate_queryset(queryset, request)

        serializer = ReturnRequestSummarySerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(
        request=None,
        responses={
            200: OpenApiResponse(description="وضعیت با موفقیت به‌روزرسانی شد"),
            400: OpenApiResponse(description="درخواست نامعتبر"),
            404: OpenApiResponse(description="درخواست یافت نشد"),
        },
        description="تغییر وضعیت یک درخواست بازگشت توسط ادمین"
    )
    def patch(self, request, pk=None):
        if not pk:
            return Response({'detail': 'شناسه مورد نیاز است'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            instance = ReturnRequest.objects.get(pk=pk)
        except ReturnRequest.DoesNotExist:
            return Response({'detail': 'درخواست یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        status_value = request.data.get('status')
        if status_value not in dict(ReturnRequest.STATUS_CHOICES):
            return Response({'status': 'وضعیت نامعتبر است'}, status=status.HTTP_400_BAD_REQUEST)

        instance.status = status_value
        instance.processed_at = timezone.now()
        instance.save()

        return Response({'detail': 'وضعیت با موفقیت به‌روزرسانی شد'})
