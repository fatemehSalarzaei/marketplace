from rest_framework import viewsets, filters
from Accounts.models import Role
from Accounts.Serializers import RoleSerializer
from app.permissions import HasModelPermission

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [HasModelPermission]
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # جستجو بر اساس فیلد name
