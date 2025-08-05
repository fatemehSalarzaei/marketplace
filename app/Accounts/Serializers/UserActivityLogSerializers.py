# accounts/serializers.py

from rest_framework import serializers
from Accounts.models import UserActivityLog

class UserActivityLogSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = UserActivityLog
        fields = ['id', 'user', 'username', 'action', 'ip_address', 'user_agent', 'created_at']

    def get_username(self, obj):
        return obj.user.phone_number if obj.user else 'Anonymous'
