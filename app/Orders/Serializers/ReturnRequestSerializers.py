from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta

from Orders.models import ReturnRequest

class ReturnRequestSerializer(serializers.ModelSerializer):
    return_quantity = serializers.IntegerField(min_value=1)

    class Meta:
        model = ReturnRequest
        fields = ['id', 'order', 'order_item', 'reason', 'status', 'requested_at', 'return_quantity']
        read_only_fields = ['status', 'requested_at']

    def validate(self, data):
        user = self.context['request'].user
        order = data['order']
        order_item = data['order_item']
        return_quantity = data.get('return_quantity', 1)

        if ReturnRequest.objects.filter(order=order, order_item=order_item).exists():
            raise ValidationError("برای این آیتم سفارش، درخواست بازگشت قبلاً ثبت شده است.")

        if order.user != user:
            raise ValidationError("شما اجازه ثبت درخواست برای این سفارش را ندارید.")

        if order.status != 'delivered':
            raise ValidationError("فقط سفارش‌های تحویل داده شده قابل بازگشت هستند.")

        delivery_time = order.status_history.filter(status='delivered').order_by('-changed_at').first()
        if not delivery_time or (timezone.now() - delivery_time.changed_at > timedelta(days=7)):
            raise ValidationError("مهلت بازگشت این سفارش به پایان رسیده است.")

        if order_item.order != order:
            raise ValidationError("آیتم انتخاب شده متعلق به این سفارش نیست.")

        if not order_item.is_returnable:
            raise ValidationError("این آیتم قابل بازگشت نیست.")

        if order_item.returned_quantity + return_quantity > order_item.quantity:
            allowed_qty = order_item.quantity - order_item.returned_quantity
            raise ValidationError(
                f"تعداد برگشت نمی‌تواند بیشتر از {allowed_qty} باشد."
            )

        return data
    def create(self, validated_data):
        order = validated_data['order']
        order_item = validated_data['order_item']
        reason = validated_data['reason']
        return_quantity = validated_data.get('return_quantity', 1)

        # چک تعداد برگشت (باید قبل از هر کاری انجام شود)
        if order_item.returned_quantity + return_quantity > order_item.quantity:
            allowed_qty = order_item.quantity - order_item.returned_quantity
            raise ValidationError(
                f"تعداد برگشت نمی‌تواند بیشتر از {allowed_qty} باشد."
            )

        # استفاده از get_or_create برای جلوگیری از تکرار
        return_request, created = ReturnRequest.objects.get_or_create(
            order=order,
            order_item=order_item,
            defaults={
                'reason': reason,
                'return_quantity': return_quantity
            }
        )

        if not created:
            raise ValidationError("برای این آیتم سفارش، درخواست بازگشت قبلاً ثبت شده است.")
        
        # افزایش returned_quantity
        order_item.returned_quantity += return_quantity
        order_item.save()

        # تنظیم وضعیت درخواست برگشت در سفارش
        order.has_return_request = True
        order.save()


        return return_request
