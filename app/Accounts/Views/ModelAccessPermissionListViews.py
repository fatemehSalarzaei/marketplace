from rest_framework import generics
from Accounts.models import ModelAccessPermission
from Accounts.Serializers import ModelAccessPermissionSerializer
from rest_framework.permissions import AllowAny  # یا AllowAny اگر بدون لاگین می‌خواهی

class ModelAccessPermissionListAPIView(generics.ListAPIView):
    queryset = ModelAccessPermission.objects.all()
    serializer_class = ModelAccessPermissionSerializer
    pagination_class = None
    permission_classes = [AllowAny]  # یا [AllowAny] برای دسترسی آزاد
