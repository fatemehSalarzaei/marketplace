from rest_framework import serializers
from Products.models import Product, ProductGalleryImage, ImageAsset
from Tags.models import Tag
from Categories.models import Category
from django.db.models import Sum

class TagShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class CategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ImageAssetShortSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ImageAsset
        fields ='__all__'
        read_only_fields = ['created_at', 'updated_at']


class ProductAdminSerializer(serializers.ModelSerializer):
    tags = TagShortSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, write_only=True, source='tags'
    )
    category = CategoryShortSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True, source='category'
    )
    main_image = ImageAssetShortSerializer(read_only=True)
    main_image_id = serializers.PrimaryKeyRelatedField(
        queryset=ImageAsset.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
        source='main_image'
    )
    availability_status = serializers.ChoiceField(choices=Product.AVAILABILITY_CHOICES)
    min_order_quantity = serializers.IntegerField()
    max_order_quantity = serializers.IntegerField()
    total_stock = serializers.SerializerMethodField()


    class Meta:
        model = Product
        fields = [
            'id', 'product_code', 'name', 'slug', 'short_description', 'long_description',
            'main_image', 'main_image_id', 'status', 'created_at', 'updated_at',
            'category', 'category_id', 'tags', 'tag_ids',
            'min_order_quantity', 'max_order_quantity', 'availability_status',
        
            'total_stock',
        ]

    def get_total_stock(self, obj):
        result = obj.variants.aggregate(total_stock=Sum('stock'))
        return result.get('total_stock') or 0
