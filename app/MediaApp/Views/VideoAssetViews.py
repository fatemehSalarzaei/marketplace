from rest_framework import viewsets, permissions, filters
from MediaApp.models import VideoAsset
from MediaApp.Serializers import VideoAssetSerializer

class VideoAssetViewSet(viewsets.ModelViewSet):
    queryset = VideoAsset.objects.all().order_by('-uploaded_at')
    serializer_class = VideoAssetSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'short_description', 'long_description']
