from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from django.shortcuts import get_object_or_404

from Orders.models import Order

from app .permissions import HasModelPermission 

class AdminOrderReportPDFAPIView(APIView):
    permission_classes = [IsAdminUser , HasModelPermission]

    def get(self, request, pk):
        order = get_object_or_404(Order.objects.prefetch_related('items__variant').select_related('user'), pk=pk)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="order_{order.order_number}.pdf"'

        p = canvas.Canvas(response, pagesize=A4)
        width, height = A4
        x_margin = 50
        y_position = height - 50

        # عنوان
        p.setFont("Helvetica-Bold", 16)
        p.drawString(x_margin, y_position, f"گزارش سفارش #{order.order_number}")
        y_position -= 30

        # اطلاعات مشتری
        p.setFont("Helvetica", 12)
        user = order.user
        p.drawString(x_margin, y_position, f"مشتری: {user.first_name} {user.last_name}")
        y_position -= 20
        p.drawString(x_margin, y_position, f"شماره تماس: {getattr(user, 'phone_number', 'نامشخص')}")
        y_position -= 30

        # اطلاعات سفارش
        p.drawString(x_margin, y_position, f"وضعیت سفارش: {order.get_status_display()}")
        y_position -= 20
        p.drawString(x_margin, y_position, f"تاریخ ایجاد: {order.created_at.strftime('%Y-%m-%d %H:%M')}")
        y_position -= 30

        # جدول آیتم‌ها
        p.setFont("Helvetica-Bold", 14)
        p.drawString(x_margin, y_position, "آیتم‌های سفارش:")
        y_position -= 25

        p.setFont("Helvetica", 11)
        for item in order.items.all():
            if y_position < 100:  # صفحه جدید اگر رسید به انتها
                p.showPage()
                y_position = height - 50

            product_name = item.title_snapshot
            variant = str(item.variant) if item.variant else "بدون نوع"
            quantity = item.quantity
            unit_price = item.unit_price
            total_price = item.total_price

            p.drawString(x_margin, y_position, f"{product_name} - {variant}")
            y_position -= 18
            p.drawString(x_margin + 20, y_position, f"تعداد: {quantity} | قیمت واحد: {unit_price} | قیمت کل: {total_price}")
            y_position -= 25

        # جمع نهایی
        if y_position < 100:
            p.showPage()
            y_position = height - 50

        p.setFont("Helvetica-Bold", 12)
        p.drawString(x_margin, y_position, f"قیمت کل: {order.total_price}")
        y_position -= 20
        p.drawString(x_margin, y_position, f"قیمت نهایی پس از تخفیف: {order.final_price}")
        y_position -= 20
        p.drawString(x_margin, y_position, f"هزینه ارسال: {order.delivery_price}")
        y_position -= 30

        p.showPage()
        p.save()

        return response
