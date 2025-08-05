# support/serializers.py
from rest_framework import serializers
from Support.models import Ticket

class PublicTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'phone_number', 'category', 'subject', 'description', 'priority', 'order_number']

class UserTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'subject', 'category', 'description', 'priority', 'status', 'order_number', 'created_at']
        read_only_fields = ['status', 'created_at']
