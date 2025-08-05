from rest_framework import serializers
from MediaApp.models import ImageAsset

class ImageAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageAsset
        fields = '__all__'
