from rest_framework import serializers
from PageBuilder.models import Element, ElementType

class ElementSerializer(serializers.ModelSerializer):
    element_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=ElementType.objects.all()
    )

    class Meta:
        model = Element
        fields = [
            'id',
            'name',
            'display_title',
            'element_type',
            'position',
            'display_style',
            'section',
            'is_active',
            'start_at',
            'end_at',
            'html_content',
        ]
