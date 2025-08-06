from rest_framework import serializers
from Orders.models import Order, OrderStatusHistory
from Shipping.models import ShippingMethod, Shipment
from django.utils import timezone

class UpdateOrderStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)
    tracking_number = serializers.CharField(required=False, allow_blank=True)
    cost = serializers.DecimalField(max_digits=8, decimal_places=2, required=False)

    def update_order_status(self, order_id, validated_data):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return False

        new_status = validated_data.get('status')
        order.status = new_status

        if new_status == 'paid':
            order.is_paid = True

        order.save()

        OrderStatusHistory.objects.create(order=order, status=new_status)

        tracking_number = validated_data.get('tracking_number', '').strip()
        # cost = validated_data.get('cost', 0)

        # وضعیت ارسال شده
        if new_status == 'shipped':
            shipment, created = Shipment.objects.get_or_create(order=order, defaults={
                'shipping_method': getattr(order, 'shipping_method', None),
                'tracking_number': tracking_number,
                'cost': order.delivery_price,
                'status': 'shipped',
                'shipped_at': timezone.now(),
            })

            if not created:
                shipment.tracking_number = tracking_number or shipment.tracking_number
                shipment.cost = cost or shipment.cost
                shipment.status = 'shipped'
                shipment.shipped_at = shipment.shipped_at or timezone.now()
                shipment.save()

        # وضعیت تحویل داده شده
        elif new_status == 'delivered':
            try:
                shipment = Shipment.objects.get(order=order)
                shipment.status = 'delivered'
                shipment.delivered_at = timezone.now()
                shipment.save()
            except Shipment.DoesNotExist:
                # اگر Shipment هنوز ایجاد نشده بود
                Shipment.objects.create(
                    order=order,
                    shipping_method=getattr(order, 'shipping_method', None),
                    tracking_number=tracking_number,
                    cost=cost,
                    status='delivered',
                    shipped_at=timezone.now(),
                    delivered_at=timezone.now()
                )

        return True
