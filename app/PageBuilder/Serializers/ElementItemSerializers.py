from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from PageBuilder.models import ElementItem, Element

class ElementItemSerializer(serializers.ModelSerializer):
    element = serializers.PrimaryKeyRelatedField(
        queryset=Element.objects.all()
    )
    content_type = serializers.SlugRelatedField(
        slug_field='model',
        queryset=ContentType.objects.all(),
        required=False,        # غیر اجباری شدن این فیلد
        allow_null=True, 
        
    )
    object_data = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ElementItem
        fields = [
            'id',
            'element',
            'title',
            'position',
            'content_type',
            'object_id',
            'object_data',
            'is_active',
        ]

    def get_object_data(self, obj):
        if obj.content_type and obj.object_id:
            try:
                model_class = obj.content_type.model_class()
                instance = model_class.objects.filter(pk=obj.object_id).first()
                if instance:
                    return {
                        "id": instance.pk,
                        "name": getattr(instance, "name", None) or getattr(instance, "title", None),
                        "str": str(instance)
                    }
            except Exception:
                pass
        return None

    def create(self, validated_data):
        if 'content_type' not in validated_data or validated_data['content_type'] is None:
            element = validated_data.get('element')
            if element and element.element_type and element.element_type.content_type:
                validated_data['content_type'] = element.element_type.content_type
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'content_type' not in validated_data or validated_data['content_type'] is None:
            element = validated_data.get('element', instance.element)
            if element and element.element_type and element.element_type.content_type:
                validated_data['content_type'] = element.element_type.content_type
        return super().update(instance, validated_data)
