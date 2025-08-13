from auditlog.models import LogEntry
from rest_framework import serializers
from Accounts.models import User

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name","email", "phone_number"]  # فیلدهای دلخواه

class LogEntrySerializer(serializers.ModelSerializer):
    actor = ActorSerializer(read_only=True)  # استفاده از Serializer تو در تو
    content_type = serializers.StringRelatedField()
    action_display = serializers.SerializerMethodField()

    class Meta:
        model = LogEntry
        fields = [
            "id", "actor", "action", "action_display", "timestamp", "object_repr",
            "changes", "content_type", "object_id", "remote_addr"
        ]

    def get_action_display(self, obj):
        return obj.get_action_display()
