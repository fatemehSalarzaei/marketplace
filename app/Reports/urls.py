# reports/urls.py
from django.urls import path
from Reports.views import *

urlpatterns = [
    path('sales/', sales_report, name='sales-report'),
    path('top-products/', top_products_report, name='top-products-report'),
    path('low-stock-products/', low_stock_products_report, name='low-stock-products-report'),
    path('api/reports/customers/', customers_report, name='customers-report'),

]
