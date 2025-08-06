from rest_framework import serializers
from django.contrib.auth import get_user_model

from Orders.models import Order, OrderItem, OrderStatusHistory
from Products.models import Product, ProductVariant
from Payments.models import Invoice, Payment
from Shipping.models import Shipment, ShippingAddress, ShippingMethod

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        # فیلدهای دلخواه کاربر (ایمیل، نام کامل، شماره تماس و ...)
        fields = ['id', 'email', 'full_name', 'phone_number']

    def get_full_name(self, obj):
        # اگر فیلد full_name مستقیم وجود ندارد، می‌توانی اینجا بسازی
        return f"{obj.first_name} {obj.last_name}".strip()



class ProductSerializer(serializers.ModelSerializer):
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'main_image_url']

    def get_main_image_url(self, obj):
        request = self.context.get('request')
        if obj.main_image and hasattr(obj.main_image, 'file') and obj.main_image.file:
            url = obj.main_image.file.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None


class VariantSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'stock', 'is_active', 'product']



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
        fields = ['name', 'description', 'cost']


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
    province_name = serializers.CharField(source='city.province.name', read_only=True)

    class Meta:
        model = ShippingAddress
        fields = [
            'first_name', 'last_name', 'city_name','province_name',
            'street_address', 'postal_code', 'phone_number'
        ]

class ShippingMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingMethod
        fields = ['id', 'name', 'description', 'cost']

class AdminOrderDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # اضافه کردن اطلاعات کاربر
    items = OrderItemSerializer(many=True, read_only=True)
    status_history = OrderStatusHistorySerializer(many=True, read_only=True)
    invoice = InvoiceSerializer(read_only=True)
    shipment = ShipmentSerializer(read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)
    shipping_method = ShippingMethodSerializer(read_only=True)  # اضافه کردن شیوه ارسال


    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'total_price', 'final_price',
            'delivery_price', 'is_paid', 'created_at','shipping_method',
            'user',  # اضافه شده
            'items', 'status_history', 'invoice', 'shipment', 'shipping_address'
        ]
