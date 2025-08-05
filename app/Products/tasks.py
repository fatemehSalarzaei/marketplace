from celery import shared_task
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.db import models


from Products.models import ProductVariant , StockAlert


@shared_task
def check_stock_levels():
    low_stock_variants = ProductVariant.objects.filter(stock__lte=models.F('low_stock_threshold'), is_active=True)

    for variant in low_stock_variants:
        already_alerted = StockAlert.objects.filter(
            variant=variant,
            triggered_at__date=timezone.now().date()
        ).exists()

        if not already_alerted:
            message = f"⚠️ موجودی محصول '{variant.product.name}' با SKU: {variant.sku} به {variant.stock} کاهش یافته است."

            # ثبت هشدار در پایگاه داده
            StockAlert.objects.create(
                variant=variant,
                message=message
            )

            # (اختیاری) ارسال ایمیل هشدار
            send_mail(
                subject='⚠️ هشدار کاهش موجودی محصول',
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.MANAGER_EMAIL],  # در settings.py تعریف شود
                fail_silently=True
            )
