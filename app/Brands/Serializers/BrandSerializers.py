# Brands/serializers.py
from rest_framework import serializers
from Brands.models import Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'
