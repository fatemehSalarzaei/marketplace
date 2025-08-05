from rest_framework import serializers
from MediaApp.models import VideoAsset

class VideoAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoAsset
        fields = '__all__'
