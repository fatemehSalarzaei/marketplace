from rest_framework import serializers
from Favorites.models import Favorite
from Products.models import Product, ProductVariant  # adjust path if needed


class ProductBasicSerializer(serializers.ModelSerializer):
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'short_description', 'main_image_url']
    def get_main_image_url(self, obj):
        request = self.context.get('request')
        if obj.main_image:
            image_url = obj.main_image.image.url
            if request:
                return request.build_absolute_uri(image_url)
            return image_url
        return None

class ProductVariantBasicSerializer(serializers.ModelSerializer):
    product = ProductBasicSerializer()

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'product']


class FavoriteSerializer(serializers.ModelSerializer):
    """Used for add/remove validation only."""
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'product', 'variant', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

    def validate(self, attrs):
        user = self.context['request'].user
        product = attrs.get('product')
        variant = attrs.get('variant')

        if not product and not variant:
            raise serializers.ValidationError("Either product or variant must be set.")
        if product and variant:
            raise serializers.ValidationError("You can only favorite either a product or a variant, not both.")

        if product and Favorite.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("This product is already in your favorites.")
        if variant and Favorite.objects.filter(user=user, variant=variant).exists():
            raise serializers.ValidationError("This variant is already in your favorites.")

        return attrs


class FavoriteListSerializer(serializers.ModelSerializer):
    """Used for listing favorites with full product info."""
    product = ProductBasicSerializer(read_only=True)
    variant = ProductVariantBasicSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'product', 'variant', 'created_at']
