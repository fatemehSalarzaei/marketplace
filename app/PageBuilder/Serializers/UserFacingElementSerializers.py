from rest_framework import serializers
from PageBuilder.models import Element, ElementItem
from Products.models import Product
from Categories.models import Category
from Banner.models import Banner


class UserFacingElementItemSerializer(serializers.ModelSerializer):
    object = serializers.SerializerMethodField()

    class Meta:
        model = ElementItem
        fields = ['id', 'title', 'extra_data',  'object']
    def get_object(self, item):
        if not item.content_object:
            return None

        obj = item.content_object
        model_name = item.content_type.model
        request = self.context.get('request')

        def get_full_url(relative_url):
            if request and relative_url:
                return request.build_absolute_uri(relative_url)
            return relative_url

        if model_name == 'banner':
            return {
                'id': obj.id,
                'title': obj.title,
                'image': get_full_url(obj.image.url) if obj.image else None,
                'url': obj.url,
                'banner_type': obj.banner_type,
            }

        elif model_name == 'product':
            return {
                'id': obj.id,
                'name': obj.name,
                'slug': obj.slug,
                'price': getattr(obj, 'price', None),
                'main_image': get_full_url(obj.main_image.url) if getattr(obj, 'main_image', None) else None,
                'availability_status': obj.availability_status,
            }

        elif model_name == 'category':
            return {
                'id': obj.id,
                'name': obj.name,
                'slug': obj.slug,
                'image': get_full_url(obj.image.url) if obj.image else None,
            }
        elif model_name == 'review':
            return {
                'id': obj.id,
                'comment': obj.comment,
                'author': obj.user.full_name,
                'avatar' :get_full_url(obj.user.avatar.url) if obj.user.avatar else None, 
                
            }

        return {'id': obj.id}

class UserFacingElementSerializer(serializers.ModelSerializer):
    element_type = serializers.CharField(source='element_type.name')
    items = UserFacingElementItemSerializer(many=True, read_only=True)

    class Meta:
        model = Element
        fields = [
            'id',
            'name',
            'display_title',
            'element_type',
            'display_style',
            'section',
            'html_content',
            'items',
        ]
