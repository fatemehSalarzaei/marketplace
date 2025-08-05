# views.py
from rest_framework import viewsets, permissions

from Carts.models import Cart
from Carts.Serializers import AdminCartSerializer

from app.permissions import HasModelPermission 

class AdminCartViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cart.objects.select_related('user').prefetch_related('items__product_variant').all()
    serializer_class = AdminCartSerializer
    permission_classes = [permissions.IsAdminUser , HasModelPermission]
