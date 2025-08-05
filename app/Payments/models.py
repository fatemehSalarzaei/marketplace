from django.db import models
from django.contrib.auth import get_user_model

from Orders.models import Order
from utils.imageUtils import compress_image

User = get_user_model()
class PaymentMethod(models.TextChoices):
    CARD = 'card', 'کارت بانکی'
    WALLET = 'wallet', 'کیف پول'
    PAYPAL = 'paypal', 'پی‌پال'


class PaymentStatus(models.TextChoices):
    PENDING = 'pending', 'در انتظار'
    SUCCESS = 'success', 'موفق'
    FAILED = 'failed', 'ناموفق'
    REFUNDED = 'refunded', 'بازگشت داده شده'


class PaymentGateway(models.Model):
    name = models.CharField(max_length=100, unique=True)  
    description = models.TextField(blank=True)            
    is_active = models.BooleanField(default=True)         
    api_url = models.URLField(blank=True, null=True)      
    api_key = models.CharField(max_length=255, blank=True, null=True)  
    api_secret = models.CharField(max_length=255, blank=True, null=True) 
    icon = models.ImageField(upload_to='payment_gateway_icons/', blank=True, null=True,) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.icon:
            self.icon = compress_image(self.icon)
        super().save(*args, **kwargs)

class Invoice(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='invoice')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    pdf_file = models.FileField(upload_to='invoices/', null=True, blank=True)  

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Invoice {self.order_id} for {self.user}"

class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    payment_gateway = models.ForeignKey(PaymentGateway, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='IRR')  # واحد پول
    transaction_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    payment_date = models.DateTimeField(auto_now_add=True)
    refunded = models.BooleanField(default=False)
    refunded_date = models.DateTimeField(null=True, blank=True)
    refund_reason = models.TextField(null=True, blank=True)
    receipt_image = models.ImageField(upload_to='payment_receipts/', null=True, blank=True)
    is_manual_review_required = models.BooleanField(default=False)
    is_approved_by_admin = models.BooleanField(default=False)
    admin_reviewed_at = models.DateTimeField(null=True, blank=True)
    admin_note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"

