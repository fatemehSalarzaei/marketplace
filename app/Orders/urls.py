from django.urls import path
from Orders.Views import *

urlpatterns = [
    path('my-orders/', UserOrderListView.as_view(), name='user-orders'),
    path('my-orders/<int:order_id>/detail/', OrderDetailAPIView.as_view(), name='order-detail'),
    path('return-request/', CreateReturnRequestView.as_view(), name='create-return-request'),
    path('admin/return-requests/', ReturnRequestAdminListUpdateAPIView.as_view(), name='admin-return-requests'),
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('admin/update-order-status/<int:order_id>', AdminUpdateOrderStatusAPIView.as_view(), name='admin-update-order-status'),
    path('admin/orders/', AdminOrderListAPIView.as_view(), name='admin-order-list'),
    path('admin/orders/<int:order_id>/', AdminOrderDetailAPIView.as_view(), name='admin-order-detail'),
    path('admin/returns/', AdminReturnRequestAPIView.as_view()),
    path('admin/returns/<int:pk>/', AdminReturnRequestAPIView.as_view()),
    path('admin/orders-report/', AdminOrderReportAPIView.as_view(), name='admin-orders-report'),
    path('admin/orders-report/<int:pk>/', AdminOrderReportAPIView.as_view(), name='admin-order-report-detail'),
    path('admin-api/orders-report-pdf/<int:pk>/', AdminOrderReportPDFAPIView.as_view(), name='admin-orders-report-pdf'),
    path('admin/sales-report/', SalesReportAPIView.as_view(), name='sales-report'),

    
]
