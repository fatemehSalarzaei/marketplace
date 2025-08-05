from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from PageBuilder.models import ElementType
from PageBuilder.Serializers import ElementTypeSerializer

from app .permissions import HasModelPermission 

class ElementTypeViewSet(viewsets.ModelViewSet):
    queryset = ElementType.objects.all()
    serializer_class = ElementTypeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]  # فقط ادمین‌ها اجازه دارند
