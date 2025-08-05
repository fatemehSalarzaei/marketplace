from rest_framework import serializers
from Products.models import  ProductGalleryImage

class ProductGalleryImageAdminSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductGalleryImage
        fields = ['id', 'product', 'image_url', 'alt_text']

    def get_image_url(self, obj):
        if obj.image_asset and obj.image_asset.image:
            request = self.context.get('request')
            image_url = obj.image_asset.image.url
            if request is not None:
                return request.build_absolute_uri(image_url)
            return image_url
        return None


