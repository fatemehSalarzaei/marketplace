# recent_views/serializers.py
from rest_framework import serializers
from History.models import RecentView
from Products.models import Product

class ProductMiniSerializer(serializers.ModelSerializer):
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

class RecentViewSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer()

    class Meta:
        model = RecentView
        fields = ["id", "product", "viewed_at"]
