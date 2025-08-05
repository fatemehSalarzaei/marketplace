from rest_framework import serializers
from Support.models import Ticket, SupportCategory
from django.contrib.auth import get_user_model
from .TicketMessageSerializers import TicketMessageSerializer

User = get_user_model()

class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']  # هر فیلدی که لازم دارید

class SupportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportCategory
        fields = ['id', 'name', 'description']

class AdminTicketSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    category = SupportCategorySerializer(read_only=True)
    messages = TicketMessageSerializer(many=True, read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=SupportCategory.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Ticket
        fields = [
            'id',
            'user',
            'messages',
            'phone_number',
            'category',
            'category_id',
            'subject',
            'description',
            'priority',
            'status',
            'order_number',
            'created_at',
            'updated_at'
        ]
