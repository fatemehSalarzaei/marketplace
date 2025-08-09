from rest_framework import serializers
from Products.models import Product
from django.db.models import Avg

class PublicProductListSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    main_image_url = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()  # ✅ اضافه کردن فیلد امتیاز
    min_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    max_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_sales = serializers.IntegerField(read_only=True)
    popularity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'main_image_url', 'short_description', 'price',
            'availability_status',
            'min_price', 'max_price', 'total_sales', 'popularity',
            'rating'  # ✅ اضافه کردن به لیست فیلدها
        ]

    def get_price(self, obj):
        cheapest_variant = obj.variants.filter(is_active=True).order_by('price').first()
        if cheapest_variant:
            return cheapest_variant.price
        return None

    def get_main_image_url(self, obj):
        request = self.context.get('request')
        if obj.main_image and obj.main_image.image:
            url = obj.main_image.image.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None

    def get_rating(self, obj):
        avg_rating = obj.reviews.filter(status="approved").aggregate(avg=Avg("rating"))["avg"]
        return round(avg_rating, 1) if avg_rating else None
