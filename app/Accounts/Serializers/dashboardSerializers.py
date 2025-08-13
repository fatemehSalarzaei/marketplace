# dashboard/serializers.py
from rest_framework import serializers
from Favorites.models import Favorite
from Orders.models import Order, OrderItem
from Products.models import Product

# Small serializer for favorites (adjust to your Favorite model serializer)
class FavoriteProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_id = serializers.SerializerMethodField()
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Favorite
        fields = ["id", "product_id", "product_name", "main_image_url", "created_at"]

    def get_product_name(self, obj):
        if obj.product:
            return obj.product.name
        if obj.variant:
            return obj.variant.product.name
        return None

    def get_product_id(self, obj):
        if obj.product:
            return obj.product.id
        if obj.variant:
            return obj.variant.product.id
        return None

    def get_main_image_url(self, obj):
        product = obj.product or (obj.variant.product if obj.variant else None)
        if not product:
            return None
        if hasattr(product, "main_image") and product.main_image:
            try:
                url = product.main_image.image.url
                request = self.context.get("request")
                if request:
                    return request.build_absolute_uri(url)
                return url
            except Exception:
                return None
        return None


class FrequentPurchaseSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    product_name = serializers.CharField()
    count = serializers.IntegerField()


class DashboardSerializer(serializers.Serializer):
    profile = serializers.DictField()
    ordersSummary = serializers.DictField()
    favorites = FavoriteProductSerializer(many=True)
    frequentPurchases = FrequentPurchaseSerializer(many=True)
