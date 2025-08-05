# Brands/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Brands.Views import *

router = DefaultRouter()
router.register('admin/brands', BrandAdminViewSet, basename='admin-brands')

urlpatterns = [
    path('', include(router.urls)),
    path('brands/', BrandListAPIView.as_view(), name='brand-list'),

]
