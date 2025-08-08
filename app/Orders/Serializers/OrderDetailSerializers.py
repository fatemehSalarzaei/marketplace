from rest_framework import serializers

from Orders.models import Order, OrderItem, OrderStatusHistory
from Products.models import Product , ProductVariant
from Payments.models import Invoice, Payment
from Shipping.models import Shipment, ShippingAddress,  ShippingMethod


class ProductSerializer(serializers.ModelSerializer):
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'main_image']

    def get_main_image(self, obj):
        request = self.context.get("request")
        if obj.main_image and hasattr(obj.main_image, 'url'):
            return request.build_absolute_uri(obj.main_image.url)
        return None


class VariantSerializer(serializers.ModelSerializer):    
    # image = serializers.SerializerMethodField()
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'is_active',  'product']

    # def get_image(self, obj):
    #     request = self.context.get("request")
    #     if obj.image and hasattr(obj.image, 'url'):
    #         return request.build_absolute_uri(obj.image.url)
    #     return None

class OrderItemSerializer(serializers.ModelSerializer):
    variant = VariantSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'title_snapshot', 'variant',
            'quantity', 'unit_price', 'total_price'
        ]


class OrderStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatusHistory
        fields = ['status', 'changed_at']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'payment_method', 'status', 'amount',
            'currency', 'transaction_id', 'payment_date',
            'refunded', 'refunded_date', 'refund_reason'
        ]


class InvoiceSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'total_amount', 'created_at', 'payments']


class ShippingMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingMethod
        fields = ['name', 'description', 'cost', ]


class ShipmentSerializer(serializers.ModelSerializer):
    shipping_method = ShippingMethodSerializer()

    class Meta:
        model = Shipment
        fields = [
            'shipping_method', 'tracking_number', 'cost',
            'status', 'shipped_at', 'delivered_at', 'created_at'
        ]


class ShippingAddressSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.name', read_only=True)

    class Meta:
        model = ShippingAddress
        fields = [
            'first_name', 'last_name', 'city_name',
            'street_address', 'postal_code', 'phone_number'
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_history = OrderStatusHistorySerializer(many=True, read_only=True)
    invoice = InvoiceSerializer(read_only=True)
    shipment = ShipmentSerializer(read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'total_price', 'final_price',
            'delivery_price', 'is_paid', 'created_at',
            'items', 'status_history', 'invoice', 'shipment', 'shipping_address'
        ]
