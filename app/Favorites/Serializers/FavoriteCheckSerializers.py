# favorites/serializers.py

from rest_framework import serializers

class FavoriteCheckSerializer(serializers.Serializer):
    product = serializers.IntegerField(required=False)
    variant = serializers.IntegerField(required=False)

    def validate(self, data):
        if not data.get('product') and not data.get('variant'):
            raise serializers.ValidationError("You must provide either product_id or variant_id.")
        if data.get('product') and data.get('variant'):
            raise serializers.ValidationError("Only one of product_id or variant_id must be provided.")
        return data
