from rest_framework import serializers
from Products.models import Product, ProductGalleryImage
from Tags.models import Tag
from Categories.models import Category

class TagShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class CategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductAdminSerializer(serializers.ModelSerializer):
    tags = TagShortSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, write_only=True, source='tags'
    )
    category = CategoryShortSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True, source='category'
    )
    availability_status = serializers.ChoiceField(choices=Product.AVAILABILITY_CHOICES)
    min_order_quantity = serializers.IntegerField()
    max_order_quantity = serializers.IntegerField()

    class Meta:
        model = Product
        fields = [
            'id', 'product_code' , 'name', 'slug', 'short_description', 'long_description',
            'main_image', 'status', 'created_at', 'updated_at',
            'category', 'category_id', 'tags', 'tag_ids','min_order_quantity', 'max_order_quantity',
            'availability_status',
        ]
