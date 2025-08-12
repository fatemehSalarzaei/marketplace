# reports/urls.py
from django.urls import path
from Reports.views import *

urlpatterns = [
    path('admin/sales/', sales_report, name='sales-report'),
    path('admin/top-products/', top_products_report, name='top-products-report'),
    path('admin/low-stock-products/', low_stock_products_report, name='low-stock-products-report'),
    path('admin/customers/', customers_report, name='customers-report'),
    path('admin/financial-logistics/', financial_logistics_report, name='financial-logistics-report'),

]
