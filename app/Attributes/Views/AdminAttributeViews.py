# views/admin/attribute.py
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend

from Attributes.models import Attribute
from Attributes.Serializers import AdminAttributeSerializer
from app.permissions import HasModelPermission

class AdminAttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AdminAttributeSerializer
    permission_classes = [IsAdminUser, HasModelPermission]
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['for_variant', 'use_predefined_values']  # فیلدهایی که می‌خواهی فیلتر بشن
    search_fields = ['name', 'slug']  # فیلدهایی که می‌خواهی جستجو بشن

    @action(detail=False, methods=['get'], url_path='product-attributes')
    def product_attributes(self, request):
        queryset = self.filter_queryset(self.queryset.filter(for_variant=False))
        return Response(self.serializer_class(queryset, many=True).data)

    @action(detail=False, methods=['get'], url_path='variant-attributes')
    def variant_attributes(self, request):
        queryset = self.filter_queryset(self.queryset.filter(for_variant=True))
        return Response(self.serializer_class(queryset, many=True).data)
from rest_framework import mixins, viewsets

class AdminAttributeAllViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AdminAttributeSerializer
    pagination_class = None