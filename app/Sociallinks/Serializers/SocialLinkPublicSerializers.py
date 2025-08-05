from rest_framework import serializers
from Sociallinks.models import SocialLink

class SocialLinkPublicSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source='get_platform_display', read_only=True)
    link = serializers.CharField(source='get_link', read_only=True)

    class Meta:
        model = SocialLink
        fields = ['platform', 'platform_display', 'display_name', 'link']
