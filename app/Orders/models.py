from django.db import models
from django.utils import timezone
from django.conf import settings
import uuid 

from Discounts.models import DiscountCode
from Products.models import ProductVariant

class Order(models.Model):

    STATUS_CHOICES = [
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت‌شده'),
        ('processing', 'در حال پردازش'),
        ('shipped', 'ارسال‌شده'),
        ('delivered', 'تحویل داده شده'),
        ('canceled', 'لغو شده'),
    ]

    order_number = models.CharField(max_length=20, unique=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    shipping_method = models.ForeignKey(
        'Shipping.ShippingMethod',  # اگر اپ و مدل ShippingMethod در اپ Shipping است
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='orders'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    coupon = models.ForeignKey('Discounts.DiscountCode', null=True, blank=True, on_delete=models.SET_NULL)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    final_price = models.DecimalField(max_digits=12, decimal_places=2)
    delivery_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)
    has_return_request = models.BooleanField(default=False)
    is_refunded = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.user.first_name} {self.user.last_name}"
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = f"{timezone.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    title_snapshot = models.CharField(max_length=20) 
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, related_name='order_items')
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    is_returnable = models.BooleanField(default=True)  # فقط آیتم‌هایی که قابل برگشت هستند
    returned_quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.variant} × {self.quantity}"
    
class OrderStatusHistory(models.Model):
    STATUS_CHOICES = [
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت‌شده'),
        ('processing', 'در حال پردازش'),
        ('shipped', 'ارسال‌شده'),
        ('delivered', 'تحویل داده شده'),
        ('canceled', 'لغو شده'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_history')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order.id} -> {self.status.title}"
    

class ReturnRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'در انتظار بررسی'),
        ('approved', 'تأیید شده'),
        ('rejected', 'رد شده'),
        ('refunded', 'مبلغ بازگشت داده شد'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='return_requests')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='return_requests')
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name='return_requests')
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    return_quantity = models.PositiveIntegerField(default=1)
    requested_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    # class Meta:
    #     unique_together = ('order', 'order_item')  # از هر آیتم فقط یکبار برگشت گرفته شود

    def __str__(self):
        return f"Return for Order #{self.order.id} - Item #{self.order_item.id}"