from django.contrib.auth import get_user_model
from rest_framework import serializers
from Notifications.models import Notification

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')

class AdminNotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ('created_at',)
