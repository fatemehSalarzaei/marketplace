# support/views.py

from rest_framework import viewsets, permissions
from Support.models import TicketMessage
from Support.Serializers import TicketMessageSerializer

from app .permissions import HasModelPermission 

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class AdminTicketMessageViewSet(viewsets.ModelViewSet):
    queryset = TicketMessage.objects.all().order_by('created_at')
    serializer_class = TicketMessageSerializer
    permission_classes = [IsAdminUser , HasModelPermission]
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
