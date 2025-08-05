from django.urls import path, include
from rest_framework.routers import DefaultRouter
from MediaApp.Views import *


router = DefaultRouter()
router.register(r'admin/images', ImageAssetViewSet, basename='imageasset')
router.register(r'admin/videos', VideoAssetViewSet, basename='videoasset')

urlpatterns = [
    path('', include(router.urls)),
]
