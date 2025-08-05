# views/admin/product_variant_attribute.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from Products.models import ProductVariantAttribute
from Products.Serializers import AdminProductVariantAttributeSerializer

from app .permissions import HasModelPermission 

class AdminProductVariantAttributeViewSet(viewsets.ModelViewSet):
    queryset = ProductVariantAttribute.objects.all()
    serializer_class = AdminProductVariantAttributeSerializer
    permission_classes = [IsAdminUser , HasModelPermission]

    def get_queryset(self):
        variant_id = self.request.query_params.get("product_variant")
        if variant_id:
            return self.queryset.filter(product_variant_id=variant_id)
        return self.queryset.none()
