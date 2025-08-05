from rest_framework import serializers
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


class AttributeValueSimpleSerializer(serializers.ModelSerializer):
    attribute = serializers.CharField(source='attribute.name')

    class Meta:
        model = AttributeValue
        fields = ['attribute', 'value']


class ProductAttributeValueSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField()  # اضافه شده: آیدی خصوصیت عمومی
    # attribute_name = serializers.CharField(source='attribute.name')
    # value = serializers.SerializerMethodField()

    class Meta:
        model = ProductAttributeValue
        fields = '__all__'

    def get_value(self, obj):
        if obj.predefined_value:
            return obj.predefined_value.value
        return obj.value


class ProductGalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductGalleryImage
        fields = ['id', 'image_url', 'alt_text']
    
    def get_image_url(self, obj):
        if obj.image_asset and obj.image_asset.image:
            request = self.context.get('request')
            image_url = obj.image_asset.image.url
            if request is not None:
                return request.build_absolute_uri(image_url)
            return image_url
        return None


class ProductVideoSerializer(serializers.ModelSerializer):
    video_url =  serializers.SerializerMethodField()

    class Meta:
        model = ProductVideo
        fields = ['id', 'video_url', 'title', 'description', 'uploaded_at']

    def get_video_url(self, obj):
        if obj.video_asset and obj.video_asset.video:
            request = self.context.get('request')
            video_url = obj.video_asset.video.url
            if request is not None:
                return request.build_absolute_uri(video_url)
            return video_url
        return None


class ProductVariantAttributeSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField()  # اضافه شده: آیدی خصوصیت واریانت
    # attribute = serializers.CharField(source='attribute_value.attribute.name')
    # value = serializers.CharField(source='attribute_value.value')

    class Meta:
        model = ProductVariantAttribute
        fields = '__all__'


class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = ProductVariantAttributeSerializer(many=True, source='variant_attributes')

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'is_active', 'image', 'attributes']


class PublicProductDetailSerializer(serializers.ModelSerializer):
    gallery_images = ProductGalleryImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    attributes = ProductAttributeValueSerializer(many=True, source='attribute_values')
    videos = ProductVideoSerializer(many=True, read_only=True)
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'product_code' ,
            'status' , 
            'availability_status',
            'short_description',
            'long_description',
            'min_order_quantity', 
            'max_order_quantity',
            'main_image',
            'gallery_images',
            'videos',
            'availability_status',
            # 'is_active',
            'brand',
            'category',
            'attributes',
            'variants',
        ]
