from rest_framework import serializers
from django.db.models import Sum

from Products.models import (
    Product,
    ProductGalleryImage,
    ProductVideo, 
    ProductVariant,
    ProductAttributeValue,
    ProductVariantAttribute
)
from Attributes.models import Attribute, AttributeValue
from Brands.models import Brand
from Categories.models import Category

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ImageAssetShortSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product.main_image.field.related_model  # ImageAsset مدل مرتبط
        fields = ['id', 'image_url', ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            url = obj.image.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None

class AttributeValueSimpleSerializer(serializers.ModelSerializer):
    attribute = serializers.CharField(source='attribute.name')

    class Meta:
        model = AttributeValue
        fields = ['attribute', 'value']

class ProductAttributeValueSerializer(serializers.ModelSerializer):
    value_display = serializers.SerializerMethodField()

    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'attribute', 'predefined_value', 'value', 'value_display']

    def get_value_display(self, obj):
        if obj.predefined_value:
            return obj.predefined_value.value
        return obj.value

class ProductGalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image_id = serializers.SerializerMethodField()

    class Meta:
        model = ProductGalleryImage
        fields = ['id', 'image_url','image_id', 'alt_text']
    
    def get_image_url(self, obj):
        if obj.image_asset and obj.image_asset.image:
            request = self.context.get('request')
            url = obj.image_asset.image.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None
    def get_image_id(self, obj):
        if obj.image_asset :
            return obj.image_asset.id
        return None

class ProductVideoSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()
    video_id = serializers.SerializerMethodField()

    class Meta:
        model = ProductVideo
        fields = ['id', 'video_url','video_id', 'title', 'description', 'uploaded_at']

    def get_video_url(self, obj):
        if obj.video_asset and obj.video_asset.video:
            request = self.context.get('request')
            url = obj.video_asset.video.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None
    def get_video_id(self, obj):
        if obj.video_asset :
            return obj.video_asset.id
        return None

class ProductVariantAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariantAttribute
        fields = '__all__'

class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = ProductVariantAttributeSerializer(many=True, source='variant_attributes')

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'is_active', 'attributes']

class ProductDetailAdminSerializer(serializers.ModelSerializer):
    gallery_images = ProductGalleryImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    attributes = ProductAttributeValueSerializer(many=True, source='attribute_values', read_only=True)
    videos = ProductVideoSerializer(many=True, read_only=True)
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    main_image = ImageAssetShortSerializer(read_only=True)
    total_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'product_code',
            'status',
            'availability_status',
            'short_description',
            'long_description',
            'min_order_quantity',
            'max_order_quantity',
            'main_image',
            'gallery_images',
            'videos',
            'brand',
            'category',
            'attributes',
            'variants',
        
            'total_stock',
        ]

    def get_total_stock(self, obj):
        result = obj.variants.aggregate(total_stock=Sum('stock'))
        return result.get('total_stock') or 0