from rest_framework import generics
from rest_framework.permissions import AllowAny
from Products.models import Product
from Products.Serializers import PublicProductDetailSerializer

class PublicProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(status='published')
    serializer_class = PublicProductDetailSerializer
    permission_classes = [AllowAny]
    # lookup_field = 'slug'
