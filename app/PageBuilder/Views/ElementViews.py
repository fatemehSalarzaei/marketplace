from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from PageBuilder.models import Element
from PageBuilder.Serializers import ElementSerializer

from app .permissions import HasModelPermission 

class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]
