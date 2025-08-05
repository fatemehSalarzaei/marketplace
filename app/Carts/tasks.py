from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import Cart

@shared_task
def delete_expired_guest_carts():
    expiration_date = timezone.now() - timedelta(days=7)
    expired_carts = Cart.objects.filter(user__isnull=True, created_at__lt=expiration_date)
    count = expired_carts.count()
    expired_carts.delete()
    return f"{count} expired guest carts deleted"
