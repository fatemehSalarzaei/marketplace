from rest_framework import viewsets, permissions, filters
from Support.models import SupportCategory
from Support.Serializers import SupportCategorySerializer
from app.permissions import HasModelPermission

class SupportCategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = SupportCategory.objects.all()
    serializer_class = SupportCategorySerializer
    permission_classes = [permissions.IsAdminUser, HasModelPermission]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # این فیلد را طبق مدل خودت تنظیم کن
