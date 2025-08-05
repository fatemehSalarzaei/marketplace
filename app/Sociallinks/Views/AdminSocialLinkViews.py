from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, OpenApiResponse

from Sociallinks.models import SocialLink
from Sociallinks.Serializers import AdminSocialLinkSerializer


from app .permissions import HasModelPermission 

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


@extend_schema(
    tags=["مدیریت لینک‌های اجتماعی (ادمین)"],
    responses={200: OpenApiResponse(description="موفق")}
)
class AdminSocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = AdminSocialLinkSerializer
    permission_classes = [IsAdminUser , HasModelPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['platform', 'is_active']
    search_fields = ['display_name', 'value']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']
