from rest_framework import serializers
from Carts.models import Cart, CartItem
from Products.models import ProductVariant, Product

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'main_image', 'short_description']

    def get_main_image(self, obj):
        request = self.context.get("request")
        if obj.main_image and hasattr(obj.main_image, 'url'):
            return request.build_absolute_uri(obj.main_image.url)
        return None

# Variant Serializer
class ProductVariantSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'image', 'product']

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None

# Cart Item Serializer
class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product_variant', 'quantity', 'price_at_time', 'get_total_price']

# Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_id', 'created_at', 'updated_at', 'is_active', 'items']
