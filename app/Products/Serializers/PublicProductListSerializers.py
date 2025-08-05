# serializers/public/product_list.py
from rest_framework import serializers
from Products.models import Product, ProductVariant

class PublicProductListSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    main_image_url = serializers.SerializerMethodField()
    min_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    max_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_sales = serializers.IntegerField(read_only=True ) 
    popularity = serializers.IntegerField(read_only=True)


    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'main_image_url', 'short_description', 'price' , 
            'availability_status',
            'min_price', 'max_price', 'total_sales','popularity']

    def get_price(self, obj):
        cheapest_variant = obj.variants.filter(is_active=True).order_by('price').first()
        if cheapest_variant:
            return cheapest_variant.price
        return None

    def get_main_image_url(self, obj):
        if obj.main_image:
            return self.context['request'].build_absolute_uri(obj.main_image.url)
        return None
