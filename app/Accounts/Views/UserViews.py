from rest_framework import viewsets, permissions, filters
from django.contrib.auth import get_user_model
from Accounts.Serializers import UserSerializer
from django_filters.rest_framework import DjangoFilterBackend

User = get_user_model()

class AdminUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for listing and updating admin users (is_staff=True).
    Only accessible by staff users.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["phone_number", "first_name", "last_name", "email", "national_code"]
    ordering_fields = ["phone_number", "date_joined", "first_name", "last_name"]
    filterset_fields = ["is_active", "is_superuser", "is_staff"]

    def get_queryset(self):
        user = self.request.user
        # همه کاربران staff به جز کاربر جاری
        return User.objects.filter(is_staff=True).exclude(id=user.id).order_by("-date_joined")

class RegularUserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for listing regular users (is_staff=False).
    Only accessible by staff users.
    """
    queryset = User.objects.filter(is_staff=False).order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["phone_number", "first_name", "last_name", "email", "national_code"]
    ordering_fields = ["phone_number", "date_joined", "first_name", "last_name"]
