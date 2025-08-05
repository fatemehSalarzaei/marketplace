
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Carts.Views import *

router = DefaultRouter()
router.register(r'admin/carts', AdminCartViewSet, basename='admin-cart')

urlpatterns = [
    path('', include(router.urls)),
    path('cart/', CartView.as_view(), name='cart'),
]