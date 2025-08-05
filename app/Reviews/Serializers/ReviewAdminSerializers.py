from rest_framework import serializers
from django.contrib.auth import get_user_model
from Reviews.models import Review
from Products.models import Product  # فرض بر این است که مدل Product در این مسیر است

User = get_user_model()

class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class ProductSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name']  # فیلدهایی که نیاز دارید

class ReviewAdminSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)
    product = ProductSimpleSerializer(read_only=True)  # اضافه شده
    # status = serializers.CharField(read_only=True)  # اضافه شده

    class Meta:
        model = Review
        fields = [
            'id',
            'product',
            'user',
            'rating',
            'comment',
            'status',       # اضافه شده
            'created_at',
            'updated_at',
            'parent',
        ]
