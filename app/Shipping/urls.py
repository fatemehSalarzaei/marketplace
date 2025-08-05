from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Shipping.Views import *

router = DefaultRouter()
router.register(r'admin/shipping-methods', ShippingMethodAdminViewSet, basename='shippingmethod')
router.register(r'admin/shipping-costs', ShippingCostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('shipping-methods/', ShippingMethodListUserAPIView.as_view(), name='shipping-methods-list-user'),

]
