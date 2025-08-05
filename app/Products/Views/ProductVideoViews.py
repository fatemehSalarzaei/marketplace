from rest_framework import viewsets, permissions
from Products.models import ProductVideo
from Products.Serializers import ProductVideoSerializer

class ProductVideoViewSet(viewsets.ModelViewSet):
    queryset = ProductVideo.objects.all()
    serializer_class = ProductVideoSerializer
    permission_classes = [permissions.IsAdminUser]  # فقط ادمین‌ها
