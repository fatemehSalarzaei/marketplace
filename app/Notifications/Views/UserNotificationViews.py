# your_app_name/views.py

from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from rest_framework.decorators import action 

from Notifications.models import Notification
from Notifications.Serializers import NotificationSerializer


class UserNotificationListView(generics.ListAPIView):
    
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class UserNotificationDetailView(generics.RetrieveUpdateAPIView):
   
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['patch', 'post'], url_path='mark-as-read')
    def mark_as_read(self, request, *args, **kwargs):
        notification = self.get_object() 
        if not notification.is_read:
            notification.is_read = True
            notification.save()
            return Response({'status': 'notification marked as read'}, status=status.HTTP_200_OK)
        return Response({'status': 'notification already read'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='mark-all-as-read')
    def mark_all_as_read(self, request, *args, **kwargs):
        unread_notifications = Notification.objects.filter(user=self.request.user, is_read=False)
        count = unread_notifications.update(is_read=True)
        return Response({'status': f'{count} notifications marked as read'}, status=status.HTTP_200_OK)