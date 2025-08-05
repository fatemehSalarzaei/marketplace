from rest_framework import serializers
from Reviews.models import Review
from django.contrib.auth import get_user_model

User = get_user_model()

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']  # یا هر فیلدی که می‌خوای نمایش داده بشه

class ReviewCreateSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['product', 'rating', 'comment', 'parent', 'user']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("امتیاز باید بین ۱ تا ۵ باشد.")
        return value
