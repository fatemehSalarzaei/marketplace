
from rest_framework import serializers
from django.contrib.auth import get_user_model
from Support.models import Ticket, TicketMessage

User = get_user_model()

class TicketMessageSerializer(serializers.ModelSerializer):
    # sender = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = TicketMessage
        fields = ['id', 'ticket', 'sender', 'message', 'attachment', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_sender(self, obj):
        return {
            "id": obj.sender.id,
            "email": obj.sender.email,
            "first_name": obj.sender.first_name,
            "last_name": obj.sender.last_name,
        }

# class TicketSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Ticket
#         fields = ['id', 'user', 'subject', 'status', 'created_at', 'updated_at', 'messages']
#         read_only_fields = ['id', 'created_at', 'updated_at']
