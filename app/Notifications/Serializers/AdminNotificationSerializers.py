
from rest_framework import serializers
from Notifications.models import Notification

class AdminNotificationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True) 

    class Meta:
        model = Notification
        fields = '__all__' 
        read_only_fields = ('created_at',)