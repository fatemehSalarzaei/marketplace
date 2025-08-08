from rest_framework import serializers
from Reviews.models import Review
from django.contrib.auth import get_user_model
from Products.models import Product  # مسیر رو درست کن بسته به ساختار پروژه

User = get_user_model()


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']


class ProductInfoSerializer(serializers.ModelSerializer):
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'main_image_url']

    def get_main_image_url(self, obj):
        request = self.context.get('request')
        if obj.main_image and obj.main_image.image:
            return request.build_absolute_uri(obj.main_image.image.url)
        return None


class ReviewListSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    product = ProductInfoSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'product',
            'status',
            'user',
            'rating',
            'comment',
            'created_at'
        ]
