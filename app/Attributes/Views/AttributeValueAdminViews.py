# Products/views/admin/attribute_value_view.py

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from Attributes.models import AttributeValue
from Attributes.Serializers import AttributeValueAdminSerializer

from app .permissions import HasModelPermission 

class AttributeValueAdminViewSet(viewsets.ModelViewSet):
    queryset = AttributeValue.objects.all()
    serializer_class = AttributeValueAdminSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]

    def get_queryset(self):
        queryset = super().get_queryset()
        attribute_id = self.request.query_params.get('attribute')
        if attribute_id:
            queryset = queryset.filter(attribute_id=attribute_id)
        return queryset
