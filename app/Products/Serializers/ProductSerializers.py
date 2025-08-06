from django.utils.text import slugify
from rest_framework import serializers
from Products.models import (
    Product, ProductGalleryImage, ProductVideo,
    ProductVariant, ProductVariantGalleryImage,
    ProductAttributeValue, ProductVariantAttribute, ImageAsset
)
from Attributes.models import Attribute, AttributeValue


class ImageAssetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ImageAsset
        fields ='__all__'
        read_only_fields = ['created_at', 'updated_at']


class ProductGalleryImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ProductGalleryImage
        fields = ['id', 'image_asset', 'alt_text']


class ProductVideoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ProductVideo
        fields = ['id', 'video_asset', 'title', 'description']


class ProductVariantGalleryImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ProductVariantGalleryImage
        fields = ['id', 'image_asset', 'alt_text']


class ProductVariantAttributeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    attribute = serializers.PrimaryKeyRelatedField(queryset=Attribute.objects.all())
    predefined_value = serializers.PrimaryKeyRelatedField(
        queryset=AttributeValue.objects.all(), allow_null=True, required=False
    )
    value = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    class Meta:
        model = ProductVariantAttribute
        fields = ['id', 'attribute', 'predefined_value', 'value']


class ProductVariantSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    gallery_images = ProductVariantGalleryImageSerializer(many=True, required=False)
    variant_attributes = ProductVariantAttributeSerializer(many=True, required=False)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'sku', 'price', 'stock', 'is_active',
            'gallery_images', 'variant_attributes'
        ]

    def validate(self, data):
        product = self.context.get('product')
        instance = self.instance
        sku = data.get('sku')
        if sku:
            qs = ProductVariant.objects.filter(product=product, sku=sku)
            if instance:
                qs = qs.exclude(id=instance.id)
            if qs.exists():
                raise serializers.ValidationError({
                    'sku': 'A variant with this SKU already exists for this product.'
                })
        return data

    def create(self, validated_data):
        gallery_images_data = validated_data.pop('gallery_images', [])
        variant_attributes_data = validated_data.pop('variant_attributes', [])
        variant = ProductVariant.objects.create(
            product=self.context['product'],
            **validated_data
        )
        for image_data in gallery_images_data:
            ProductVariantGalleryImage.objects.create(product_variant=variant, **image_data)
        for attr_data in variant_attributes_data:
            ProductVariantAttribute.objects.create(product_variant=variant, **attr_data)
        return variant

    def update(self, instance, validated_data):
        gallery_images_data = validated_data.pop('gallery_images', [])
        variant_attributes_data = validated_data.pop('variant_attributes', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        existing_image_ids = [img.get('id') for img in gallery_images_data if img.get('id')]
        instance.gallery_images.exclude(id__in=existing_image_ids).delete()

        for image_data in gallery_images_data:
            image_id = image_data.get('id')
            if image_id:
                ProductVariantGalleryImage.objects.filter(id=image_id).update(**image_data)
            else:
                ProductVariantGalleryImage.objects.create(product_variant=instance, **image_data)

        existing_attr_ids = [attr.get('id') for attr in variant_attributes_data if attr.get('id')]
        instance.variant_attributes.exclude(id__in=existing_attr_ids).delete()

        for attr_data in variant_attributes_data:
            attr_id = attr_data.get('id')
            if attr_id:
                ProductVariantAttribute.objects.filter(id=attr_id).update(**attr_data)
            else:
                ProductVariantAttribute.objects.create(product_variant=instance, **attr_data)

        return instance


class ProductAttributeValueSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    attribute = serializers.PrimaryKeyRelatedField(queryset=Attribute.objects.all())
    predefined_value = serializers.PrimaryKeyRelatedField(
        queryset=AttributeValue.objects.all(), allow_null=True, required=False
    )
    value = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'attribute', 'predefined_value', 'value']


class ProductSerializer(serializers.ModelSerializer):
    gallery_images = ProductGalleryImageSerializer(many=True, required=False)
    videos = ProductVideoSerializer(many=True, required=False)
    variants = ProductVariantSerializer(many=True, required=False)
    attribute_values = ProductAttributeValueSerializer(many=True, required=False)

    main_image = ImageAssetSerializer(read_only=True)
    main_image_id = serializers.PrimaryKeyRelatedField(
        queryset=ImageAsset.objects.all(),
        source='main_image',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'product_code', 'category', 'brand', 'tags', 'name', 'slug',
            'short_description', 'long_description', 'status', 'availability_status',
            'main_image', 'main_image_id',
            'min_order_quantity', 'max_order_quantity',
            'gallery_images', 'videos', 'variants', 'attribute_values',
        ]
        read_only_fields = ['slug']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        gallery_data = validated_data.pop('gallery_images', [])
        videos_data = validated_data.pop('videos', [])
        variants_data = validated_data.pop('variants', [])
        attributes_data = validated_data.pop('attribute_values', [])

        validated_data['slug'] = slugify(validated_data.get('name', ''))
        product = Product.objects.create(**validated_data)

        if tags_data:
            product.tags.set(tags_data)

        for img in gallery_data:
            ProductGalleryImage.objects.create(product=product, **img)

        for video in videos_data:
            ProductVideo.objects.create(product=product, **video)

        for attr_data in attributes_data:
            ProductAttributeValue.objects.create(product=product, **attr_data)

        for variant_data in variants_data:
            serializer = ProductVariantSerializer(
                data=variant_data,
                context={'product': product}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return product

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        gallery_data = validated_data.pop('gallery_images', None)
        videos_data = validated_data.pop('videos', None)
        variants_data = validated_data.pop('variants', None)
        attributes_data = validated_data.pop('attribute_values', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if 'name' in validated_data:
            instance.slug = slugify(validated_data['name'])
        instance.save()

        if tags_data is not None:
            instance.tags.set(tags_data)

        if gallery_data is not None:
            existing_gallery_ids = [img.get('id') for img in gallery_data if img.get('id')]
            instance.gallery_images.exclude(id__in=existing_gallery_ids).delete()
            for img_data in gallery_data:
                img_id = img_data.get('id')
                if img_id:
                    ProductGalleryImage.objects.filter(id=img_id).update(**img_data)
                else:
                    ProductGalleryImage.objects.create(product=instance, **img_data)

        if videos_data is not None:
            existing_video_ids = [video.get('id') for video in videos_data if video.get('id')]
            instance.videos.exclude(id__in=existing_video_ids).delete()
            for video_data in videos_data:
                video_id = video_data.get('id')
                if video_id:
                    ProductVideo.objects.filter(id=video_id).update(**video_data)
                else:
                    ProductVideo.objects.create(product=instance, **video_data)

        if attributes_data is not None:
            existing_attr_ids = [attr.get('id') for attr in attributes_data if attr.get('id')]
            instance.attribute_values.exclude(id__in=existing_attr_ids).delete()
            for attr_data in attributes_data:
                attr_id = attr_data.get('id')
                if attr_id:
                    ProductAttributeValue.objects.filter(id=attr_id).update(**attr_data)
                else:
                    ProductAttributeValue.objects.create(product=instance, **attr_data)

        if variants_data is not None:
            existing_variant_ids = []
            for variant_data in variants_data:
                variant_id = variant_data.get('id')
                if variant_id:
                    try:
                        variant = ProductVariant.objects.get(id=variant_id, product=instance)
                    except ProductVariant.DoesNotExist:
                        continue
                    serializer = ProductVariantSerializer(
                        instance=variant,
                        data=variant_data,
                        context={'product': instance},
                        partial=True
                    )
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    existing_variant_ids.append(variant_id)
                else:
                    serializer = ProductVariantSerializer(
                        data=variant_data,
                        context={'product': instance}
                    )
                    serializer.is_valid(raise_exception=True)
                    variant = serializer.save()
                    existing_variant_ids.append(variant.id)

            instance.variants.exclude(id__in=existing_variant_ids).delete()

        return instance
