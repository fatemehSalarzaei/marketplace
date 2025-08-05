from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from PageBuilder.models import ElementType

class ElementTypeSerializer(serializers.ModelSerializer):
    # نمایش مدل مرتبط به صورت نام مدل
    content_type = serializers.SlugRelatedField(
        slug_field='model',
        queryset=ContentType.objects.all(),
        allow_null=True,
        required=False,
    )

    class Meta:
        model = ElementType
        fields = ['id', 'name', 'content_type']
