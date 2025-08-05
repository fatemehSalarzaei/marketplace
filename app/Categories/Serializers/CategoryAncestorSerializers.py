# serializers.py
from rest_framework import serializers
from Categories.models import Category

class CategoryAncestorSerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent']

    def get_parent(self, obj):
        if obj.parent:
            return CategoryAncestorSerializer(obj.parent).data
        return None
