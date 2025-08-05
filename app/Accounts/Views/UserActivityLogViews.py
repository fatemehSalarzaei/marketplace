# accounts/views.py

from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from Accounts.models import UserActivityLog
from Accounts.Serializers import UserActivityLogSerializer

from app .permissions import HasModelPermission 

class UserActivityLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserActivityLog.objects.select_related('user').order_by('-created_at')
    serializer_class = UserActivityLogSerializer
    permission_classes = [permissions.IsAdminUser ,HasModelPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['user__phone_number', 'action']
    search_fields = ['action', 'ip_address', 'user_agent']
