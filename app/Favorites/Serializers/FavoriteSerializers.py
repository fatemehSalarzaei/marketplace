# serializers.py

from rest_framework import serializers
from Favorites.models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
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

        # چک کردن وجود رکورد تکراری
        if product and Favorite.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("This product is already in your favorites.")
        if variant and Favorite.objects.filter(user=user, variant=variant).exists():
            raise serializers.ValidationError("This variant is already in your favorites.")

        return attrs
