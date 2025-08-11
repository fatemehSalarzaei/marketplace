from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from PageBuilder.models import ElementItem
from PageBuilder.Serializers import ElementItemSerializer

from app.permissions import HasModelPermission 

class ElementItemViewSet(viewsets.ModelViewSet):
    serializer_class = ElementItemSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]
    pagination_class = None

    def get_queryset(self):
        queryset = ElementItem.objects.all()
        element_id = self.request.query_params.get('element')
        if element_id:
            queryset = queryset.filter(element_id=element_id)
        return queryset
