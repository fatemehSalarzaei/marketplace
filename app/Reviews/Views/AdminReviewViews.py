from rest_framework import viewsets, permissions, filters
from rest_framework.permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend

from Reviews.models import Review
from Reviews.Serializers import ReviewAdminSerializer

from app .permissions import HasModelPermission 

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class AdminReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewAdminSerializer
    permission_classes = [IsAdminUser, HasModelPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'rating', 'product']
    search_fields = ['user__first_name', 'user__last_name', 'comment']
    ordering_fields = ['created_at', 'rating']
