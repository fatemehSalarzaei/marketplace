from rest_framework import serializers
from Sociallinks.models import SocialLink


class AdminSocialLinkSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source='get_platform_display', read_only=True)
    link = serializers.CharField(source='get_link', read_only=True)

    class Meta:
        model = SocialLink
        fields = [
            'id', 'platform', 'platform_display', 'display_name', 'value',
            'is_active', 'order', 'link', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
