from django.db import models
from django.conf import settings
from Products.models import Product, ProductVariant
from Categories.models import Category


class Discount(models.Model):
    DISCOUNT_TYPE_CHOICES = [
        ('percent', 'درصدی'),
        ('fixed', 'مقدار ثابت'),
    ]

    title = models.CharField(max_length=255)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    products = models.ManyToManyField(Product, blank=True)
    variants = models.ManyToManyField(ProductVariant, blank=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return f"{self.title} ({self.get_discount_type_display()} - {self.amount})"

class DiscountCode(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE, related_name="codes")
    usage_limit = models.PositiveIntegerField(null=True, blank=True)  # تعداد دفعات قابل استفاده
    used_count = models.PositiveIntegerField(default=0)
    user_specific = models.BooleanField(default=False)
    allowed_users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    min_order_total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Code: {self.code} | Discount: {self.discount.title}"
