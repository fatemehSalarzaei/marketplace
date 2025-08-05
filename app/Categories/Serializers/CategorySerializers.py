from rest_framework import serializers
from Categories.models import Category
from Tags.models import Tag 

class TagSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ParentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    tags = TagSimpleSerializer(many=True, read_only=True)
    parent = ParentCategorySerializer(read_only=True)
    parent_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='parent',
        write_only=True,
        allow_null=True,
        required=False
    )

    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'parent', 'parent_id', 'description', 'image', 'icon',
            'is_active', 'tags', 'meta_title', 'meta_description', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at', 'parent', 'tags']
