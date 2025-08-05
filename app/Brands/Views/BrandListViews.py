# Brands/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny
from Brands.models import Brand
from Brands.Serializers import BrandSerializer

class BrandListAPIView(generics.ListAPIView):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]
