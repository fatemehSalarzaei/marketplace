from rest_framework import serializers
from Categories.models import Category


class CategoryTreeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'children']

    def get_children(self, obj):
        children = obj.children.filter(is_active=True, is_deleted=False)
        return CategoryTreeSerializer(children, many=True).data
