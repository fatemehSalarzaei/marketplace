from rest_framework import viewsets, permissions, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend

from Categories.models import Category
from Categories.Serializers import CategorySerializer
from app.permissions import HasModelPermission


class AdminCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_deleted=False)
    serializer_class = CategorySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['is_active']  # برای فیلتر دقیق
    search_fields = ['name']  # برای جستجو

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
