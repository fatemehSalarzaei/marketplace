from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Addresses.Views import AddressViewSet

router = DefaultRouter()
router.register(r'me', AddressViewSet, basename='address')

urlpatterns = [
    path('', include(router.urls)),
]