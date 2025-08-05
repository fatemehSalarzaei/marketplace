# Brands/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Banner.Views import *

router = DefaultRouter()
router.register(r'admin/banners', AdminBannerViewSet, basename='banner')
router.register(r'banners', BannerViewSet, basename='banners')

urlpatterns = [
    path('', include(router.urls)),

]
