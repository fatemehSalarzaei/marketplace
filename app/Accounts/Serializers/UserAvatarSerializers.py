from rest_framework import serializers

from Accounts.models import User


class UserAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar']

    def validate_avatar(self, image):
        if image.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("حجم عکس نباید بیشتر از ۲ مگابایت باشد.")
        if not image.content_type in ['image/jpeg', 'image/png']:
            raise serializers.ValidationError("فرمت تصویر باید jpg یا png باشد.")
        return image
