# Carts/Serializers.py

from rest_framework import serializers


class AddToCartSerializer(serializers.Serializer):
    variant_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
