from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from Payments.models import Payment
from django.http import HttpResponse
from django.utils.dateparse import parse_date
from django.utils import timezone

import io
import openpyxl
from openpyxl.utils import get_column_letter
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm


from app .permissions import HasModelPermission 

class AdminPaymentPDFExportAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]

    def get(self, request):
        status_filter = request.query_params.get("status")
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        payments = Payment.objects.select_related('user', 'payment_gateway').all()

        if status_filter:
            payments = payments.filter(status=status_filter)
        if start_date:
            payments = payments.filter(payment_date__date__gte=parse_date(start_date))
        if end_date:
            payments = payments.filter(payment_date__date__lte=parse_date(end_date))

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        y = height - 2 * cm

        p.setFont("Helvetica-Bold", 14)
        p.drawString(2 * cm, y, "گزارش پرداخت‌ها")
        y -= 1.5 * cm

        p.setFont("Helvetica", 10)
        for payment in payments:
            line = f"{payment.id} | {payment.user.email} | {payment.amount} {payment.currency} | {payment.status} | {payment.payment_date.strftime('%Y-%m-%d %H:%M')}"
            p.drawString(2 * cm, y, line)
            y -= 1 * cm
            if y < 3 * cm:
                p.showPage()
                y = height - 2 * cm
                p.setFont("Helvetica", 10)

        p.save()
        buffer.seek(0)

        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="payments_report_{timezone.now().date()}.pdf"'
        return response


