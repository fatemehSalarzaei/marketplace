
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Payments.Views import *

router = DefaultRouter()
router.register(r'admin/payment-gateways', PaymentGatewayViewSet, basename='paymentgateway')

urlpatterns = [
    path('', include(router.urls)),
    path('gateways/', PublicPaymentGatewayListView.as_view(), name='public-payment-gateways'),
    path('payments/<int:pk>/upload-receipt/', UploadPaymentReceiptAPIView.as_view(), name='upload-payment-receipt'),
    path('admin/payments/<int:pk>/review/', AdminPaymentReviewAPIView.as_view(), name='admin-payment-review'),
    path('admin/reports/payments/', AdminPaymentReportAPIView.as_view(), name='admin-payment-reports'),
    path('admin/reports/payments/export/pdf/', AdminPaymentPDFExportAPIView.as_view(), name='admin-payment-export-pdf'),
    path('admin/reports/payments/export/excel/', AdminPaymentExcelExportAPIView.as_view(), name='admin-payment-export-excel'),
    path('admin/payments/', payment_list, name='payment-list'),

]