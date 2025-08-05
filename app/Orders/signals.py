# Orders/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from .models import Order, OrderStatusHistory
from Payments.models import Invoice
from Notifications.utils import send_sms_to_user
from .models import ReturnRequest
from Notifications.utils import send_admin_notification 



@receiver(post_save, sender=Order)
def order_paid_signal(sender, instance, created, **kwargs):
    if not created and instance.status == 'paid' and instance.is_paid:

        invoice, created = Invoice.objects.get_or_create(
            order=instance,
            user=instance.user,
            defaults={'total_amount': instance.final_price}
        )

        user = instance.user
        phone = getattr(user, 'phone_number', None)

        if phone:
            message = f"سفارش شما با شماره {instance.order_number} پرداخت شد. از خرید شما متشکریم."
            send_sms_to_user(phone, message)

@receiver(post_save, sender=ReturnRequest)
def notify_admin_on_return_request(sender, instance, created, **kwargs):
    if created:
        pass
        # notify_admins_about_return_request(instance)