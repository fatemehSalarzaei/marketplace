from rest_framework import viewsets, permissions
from Support.models import SupportCategory
from Support.Serializers import SupportCategorySerializer

class SupportCategoryUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SupportCategory.objects.all()
    serializer_class = SupportCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

