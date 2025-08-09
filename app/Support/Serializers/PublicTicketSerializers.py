# support/serializers.py
from rest_framework import serializers
from Support.models import *

class PublicTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'phone_number', 'category', 'subject', 'description', 'priority', 'order_number']


class SupportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportCategory
        fields = ['id', 'name', 'description']


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']  # هر فیلدی که لازم دارید

class TicketMessageSerializer(serializers.ModelSerializer):
    sender =  UserMiniSerializer(read_only=True)

    class Meta:
        model = TicketMessage
        fields = ['id', 'sender', 'message', 'attachment', 'created_at']

class UserTicketSerializer(serializers.ModelSerializer):
    category = SupportCategorySerializer(read_only=True)  # نمایش اطلاعات دسته‌بندی
    messages = TicketMessageSerializer(many=True, read_only=True)  # نمایش لیست پیام‌ها

    class Meta:
        model = Ticket
        fields = [
            'id',
            'subject',
            'category',
            'description',
            'priority',
            'status',
            'order_number',
            'created_at',
            'messages'
        ]
        read_only_fields = ['status', 'created_at', 'user']
