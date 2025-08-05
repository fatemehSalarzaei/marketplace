from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from Orders.models import Order
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import datetime, timedelta

class SalesReportAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        report_type = request.query_params.get('type', 'daily')  # daily, monthly, yearly

        today = timezone.now().date()

        if report_type == 'daily':
            start_date = today
            end_date = today + timedelta(days=1)

        elif report_type == 'monthly':
            start_date = today.replace(day=1)
            end_date = (start_date + timedelta(days=32)).replace(day=1)

        elif report_type == 'yearly':
            start_date = today.replace(month=1, day=1)
            end_date = today.replace(month=12, day=31) + timedelta(days=1)

        else:
            return Response({"detail": "نوع گزارش نامعتبر است."}, status=status.HTTP_400_BAD_REQUEST)

        orders = Order.objects.filter(
            created_at__gte=start_date,
            created_at__lt=end_date,
            is_paid=True
        )

        total_sales = orders.aggregate(total=Sum('final_price'))['total'] or 0
        order_count = orders.count()

        return Response({
            "report_type": report_type,
            "total_sales": total_sales,
            "order_count": order_count,
            "start_date": start_date,
            "end_date": end_date
        }, status=status.HTTP_200_OK)
