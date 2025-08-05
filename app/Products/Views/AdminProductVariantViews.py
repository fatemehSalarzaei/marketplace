# views/admin/product_variant.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from Products.models import ProductVariant
from Products.Serializers import AdminProductVariantSerializer

from app .permissions import HasModelPermission 

class AdminProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related('product').all()
    serializer_class = AdminProductVariantSerializer
    permission_classes = [IsAdminUser, HasModelPermission]

    def get_queryset(self):
        product_id = self.request.query_params.get('product')
        if product_id:
            return self.queryset.filter(product_id=product_id)
        return self.queryset.none()
