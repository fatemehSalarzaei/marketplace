from auditlog.models import LogEntry
from rest_framework import serializers


class LogEntrySerializer(serializers.ModelSerializer):
    actor = serializers.StringRelatedField()
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