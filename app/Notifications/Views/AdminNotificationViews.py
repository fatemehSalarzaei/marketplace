from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from Notifications.models import Notification
from Notifications.Serializers import AdminNotificationSerializer
from app.permissions import HasModelPermission

class AdminNotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = AdminNotificationSerializer
    permission_classes = [IsAdminUser, HasModelPermission]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    filterset_fields = {
        'is_read': ['exact'],
        'type': ['exact'],
        'channel': ['exact'],
    }

    search_fields = [
        'title',
        'message',
        'user__first_name',
        'user__last_name',
        'user__phone_number',  # یا نام دقیق فیلد شماره تماس در مدل User
    ]
