# views/admin/product_attribute_value.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from Products.models import ProductAttributeValue
from Products.Serializers import AdminProductAttributeValueSerializer

from app .permissions import HasModelPermission 

class AdminProductAttributeValueViewSet(viewsets.ModelViewSet):
    queryset = ProductAttributeValue.objects.all()
    serializer_class = AdminProductAttributeValueSerializer
    permission_classes = [IsAdminUser, HasModelPermission]

    def get_queryset(self):
        product_id = self.request.query_params.get("product")
        if product_id:
            return self.queryset.filter(product_id=product_id)
        return self.queryset.none()
