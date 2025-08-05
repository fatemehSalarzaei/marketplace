from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from Attributes.models import AttributeGroup
from Attributes.Serializers import AttributeGroupSerializer
from app.permissions import HasModelPermission

class AttributeGroupViewSet(viewsets.ModelViewSet):
    queryset = AttributeGroup.objects.prefetch_related('attribute').all()
    serializer_class = AttributeGroupSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]

    # اضافه کردن جستجو
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # فرض می‌کنیم که فیلد نام گروه 'name' است
