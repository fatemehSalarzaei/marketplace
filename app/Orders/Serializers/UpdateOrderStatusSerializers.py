# Orders/Serializers.py

from rest_framework import serializers
from Orders.models import Order, OrderStatusHistory
from Shipping.models import ShippingMethod  , Shipment # فرض بر اینکه اینجا هست
from django.utils import timezone

class UpdateOrderStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)
    shipping_method_id = serializers.IntegerField(required=False)
    tracking_number = serializers.CharField(required=False, allow_blank=True)
    cost = serializers.DecimalField(required=False, max_digits=8, decimal_places=2)

    def update_order_status(self, order_id, validated_data):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return False

        new_status = validated_data.get('status')
        order.status = new_status

        # وضعیت پرداخت
        if new_status == 'paid':
            order.is_paid = True

        order.save()

        # ثبت در تاریخچه وضعیت
        OrderStatusHistory.objects.create(order=order, status=new_status)

        # ثبت اطلاعات ارسال
        if new_status == 'shipped':
            shipping_method_id = validated_data.get('shipping_method_id')
            tracking_number = validated_data.get('tracking_number')
            cost = validated_data.get('cost')

            shipping_method = ShippingMethod.objects.filter(id=shipping_method_id).first() if shipping_method_id else None

            Shipment.objects.update_or_create(
                order=order,
                defaults={
                    'shipping_method': shipping_method,
                    'tracking_number': tracking_number,
                    'cost': cost or 0,
                    'status': 'shipped',
                    'shipped_at': timezone.now(),
                }
            )

        return True
