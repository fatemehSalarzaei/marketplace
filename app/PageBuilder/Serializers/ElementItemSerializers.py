from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from PageBuilder.models import ElementItem, Element

class ElementItemSerializer(serializers.ModelSerializer):
    element = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Element.objects.all()
    )
    content_type = serializers.SlugRelatedField(
        slug_field='model',
        queryset=ContentType.objects.all()
    )

    class Meta:
        model = ElementItem
        fields = [
            'id',
            'element',
            'title',
            'position',
            'content_type',
            'object_id',
        ]
