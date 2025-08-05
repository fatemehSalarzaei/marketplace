from rest_framework import serializers
from Products.models import ProductVideo

class ProductVideoSerializer(serializers.ModelSerializer):
    video_url =  serializers.SerializerMethodField()


    class Meta:
        model = ProductVideo
        fields = ['id', 'product', 'video_url', 'title', 'description', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


    def get_video_url(self, obj):
        if obj.video_asset and obj.video_asset.video:
            request = self.context.get('request')
            image_url = obj.video_asset.video.url
            if request is not None:
                return request.build_absolute_uri(image_url)
            return image_url
        return None
