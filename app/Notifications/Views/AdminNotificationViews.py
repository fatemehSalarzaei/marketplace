
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser 
from Notifications.models import Notification
from Notifications.Serializers import AdminNotificationSerializer

from app .permissions import HasModelPermission 

class AdminNotificationViewSet(viewsets.ModelViewSet):
    
    queryset = Notification.objects.all().order_by('-created_at') 
    serializer_class = AdminNotificationSerializer
    permission_classes = [IsAdminUser , HasModelPermission]