from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from PageBuilder.models import ElementItem
from PageBuilder.Serializers import ElementItemSerializer

from app .permissions import HasModelPermission 

class ElementItemViewSet(viewsets.ModelViewSet):
    queryset = ElementItem.objects.all()
    serializer_class = ElementItemSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]
