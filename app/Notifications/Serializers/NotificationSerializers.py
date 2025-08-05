# your_app_name/serializers.py

from rest_framework import serializers
from Notifications.models import Notification
class NotificationSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Notification
        fields = '__all__' 
        read_only_fields = ('created_at',)