# serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers

from Products.models import Product , ProductVariant
from Carts.models import Cart, CartItem
from drf_spectacular.utils import extend_schema_field

User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'main_image', 'short_description']

class ProductVariantSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'product']

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'date_joined']

class AdminCartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product_variant', 'quantity', 'price_at_time', 'total_price']

    @extend_schema_field(serializers.CharField())
    def get_total_price(self, obj):
        return obj.get_total_price()

class AdminCartSerializer(serializers.ModelSerializer):
    user = AdminUserSerializer(read_only=True)
    items = AdminCartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_id', 'created_at', 'updated_at', 'is_active', 'total_price', 'total_quantity', 'items']
    
    @extend_schema_field(serializers.CharField())
    def get_total_price(self, obj):
        return obj.get_total_price()

    @extend_schema_field(serializers.CharField())
    def get_total_quantity(self, obj):
        return obj.get_total_quantity()
