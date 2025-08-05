# shipping/serializers.py

from rest_framework import serializers
from Shipping.models import  ShippingCost , ShippingMethod
from Products.models import Product
from Categories.models import Category
# --- Serializers for related models (if you need APIs for them) ---

class ShippingMethodSerializer(serializers.ModelSerializer):
    """Serializes the ShippingMethod model."""
    class Meta:
        model = ShippingMethod
        fields = '__all__' # Includes id, name, description, is_active

class CategorySerializer(serializers.ModelSerializer):
    """Serializes the Category model."""
    class Meta:
        model = Category
        fields = '__all__' # Includes id, name

class ProductSerializer(serializers.ModelSerializer):
    """Serializes the Product model."""
    class Meta:
        model = Product
        fields = '__all__' # Includes id, name, category, price, weight_g

# --- Main ShippingCost Serializer ---

class ShippingCostSerializer(serializers.ModelSerializer):
    """
    Serializes the ShippingCost model.
    Includes read-only fields for displaying related object names.
    """
    # These fields are read-only and display the 'name' of the related object
    # instead of just its ID. Useful for API readability.
    shipping_method_name = serializers.CharField(source='shipping_method.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = ShippingCost
        fields = [
            'id',
            # Foreign Key IDs (for sending data to create/update)
            'shipping_method',
            'category',
            'product',
            # Read-only names (for receiving data from API)
            'shipping_method_name',
            'category_name',
            'product_name',
            # Other fields
            'min_weight_g',
            'max_weight_g',
            'min_price',
            'max_price',
            'cost',
            'is_active',
            'priority',
            'created_at',
            'updated_at',
        ]
        # Make these fields read-only as they are automatically managed by Django
        read_only_fields = ['created_at', 'updated_at', 'shipping_method_name', 'category_name', 'product_name']

    def validate(self, data):
        """
        Custom validation to ensure logical consistency.
        For example, product and category cannot both be set for a rule.
        Or min_weight_g < max_weight_g, etc.
        """
        product = data.get('product')
        category = data.get('category')
        
        # Rule: A ShippingCost rule should ideally be for a specific product OR a specific category OR general, not both.
        if product and category:
            raise serializers.ValidationError("A shipping cost rule cannot be tied to both a specific product and a category.")
        
        min_weight = data.get('min_weight_g')
        max_weight = data.get('max_weight_g')
        if min_weight is not None and max_weight is not None and min_weight > max_weight:
            raise serializers.ValidationError("min_weight_g cannot be greater than max_weight_g.")

        min_price = data.get('min_price')
        max_price = data.get('max_price')
        if min_price is not None and max_price is not None and min_price > max_price:
            raise serializers.ValidationError("min_price cannot be greater than max_price.")

        return data
    