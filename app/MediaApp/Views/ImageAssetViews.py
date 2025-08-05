from rest_framework import viewsets, permissions, filters
from MediaApp.models import ImageAsset
from MediaApp.Serializers import ImageAssetSerializer



class ImageAssetViewSet(viewsets.ModelViewSet):
    queryset = ImageAsset.objects.all().order_by('-uploaded_at')
    serializer_class = ImageAssetSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'short_description', 'long_description']