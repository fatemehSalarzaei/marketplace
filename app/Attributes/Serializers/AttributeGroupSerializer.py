# serializers.py

from rest_framework import serializers
from Attributes.models import Attribute, AttributeGroup


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['id', 'name', 'slug', 'use_predefined_values', 'for_variant']

class AttributeGroupSerializer(serializers.ModelSerializer):
    attributes = AttributeSerializer(many=True, read_only=True)  # برای نمایش داده‌ها
    attribute_ids = serializers.PrimaryKeyRelatedField(
        queryset=Attribute.objects.all(),
        many=True,
        write_only=True,
        source='attributes'  # این باید اسم دقیق فیلد مدل باشد
    )

    class Meta:
        model = AttributeGroup
        fields = ['id', 'name', 'description', 'slug', 'attributes', 'attribute_ids']

    def create(self, validated_data):
        attributes = validated_data.pop('attributes', [])
        group = AttributeGroup.objects.create(**validated_data)
        group.attribute.set(attributes)
        return group

    def update(self, instance, validated_data):
        attributes = validated_data.pop('attributes', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if attributes is not None:
            instance.attributes.set(attributes)
        return instance
