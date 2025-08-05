from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from Brands.models import Brand
from Brands.Serializers import BrandSerializer

from app.permissions import HasModelPermission 

class BrandAdminViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser, HasModelPermission]

    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    # اضافه کردن فیلترها
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['is_active']  # فیلتر براساس وضعیت
    search_fields = ['name']          # جستجو براساس نام

    def destroy(self, request, *args, **kwargs):
        brand = self.get_object()
        brand.is_active = False
        brand.save()
        return Response({'detail': 'Brand deactivated successfully.'}, status=status.HTTP_204_NO_CONTENT)
