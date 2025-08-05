from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator

from Orders.models import Order
from Addresses.models import City
from Products.models import Product
from Categories.models import Category

class ShippingMethod(models.Model):
    name = models.CharField(max_length=100) 
    description = models.TextField(blank=True)
    cost = models.DecimalField(max_digits=8, decimal_places=2) 
    min_estimated_days = models.PositiveIntegerField(null=True,  blank=True,  )
    max_estimated_days = models.PositiveIntegerField(null=True, blank=True,  )
    active = models.BooleanField( default=True, )
    def __str__(self):
        return self.name



class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shipping_address')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20, 
                    validators=[RegexValidator(regex=r'^\d{10}$', 
                    message="کد پستی باید 10 رقم باشد.")])
    phone_number = models.CharField(max_length=15, blank=True, 
                    validators=[RegexValidator(regex=r'^09\d{9}$', 
                    message="شماره تماس باید با 09 شروع شده و 11 رقم باشد.")])
 

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.city}"

class Shipment(models.Model):
    SHIPPING_STATUS_CHOICES = [
        ('pending', 'در انتظار ارسال'),
        ('shipped', 'ارسال‌شده'),
        ('in_transit', 'در حال انتقال'),
        ('delivered', 'تحویل داده شده'),
        ('cancelled', 'لغو شده'),
    ]

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shipment')
    shipping_method = models.ForeignKey(ShippingMethod, on_delete=models.SET_NULL, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=SHIPPING_STATUS_CHOICES, default='pending')
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    preferred_delivery_time = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="زمان دلخواه برای ارسال"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shipment for Order #{self.order.id} - Status: {self.status}"


class ShippingCost(models.Model):
    """
    مدل برای تعریف قوانین هزینه ارسال.
    این مدل قوانین هزینه ارسال را بر اساس شیوه ارسال،
    دسته بندی، محصول، محدوده وزن و محدوده قیمت مدیریت می‌کند.
    """
    shipping_method = models.ForeignKey(
        ShippingMethod,
        on_delete=models.CASCADE, # اگر شیوه ارسال حذف شود، قوانین مرتبط هم حذف شوند
        related_name='shipping_costs', # نامی برای دسترسی معکوس از ShippingMethod به ShippingCost
        verbose_name="شیوه ارسال"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL, # اگر دسته بندی حذف شود، این فیلد NULL شود
        null=True,                  # اجازه می‌دهد فیلد در دیتابیس NULL باشد
        blank=True,                 # اجازه می‌دهد فیلد در فرم‌های جنگو خالی باشد
        related_name='shipping_costs',
        verbose_name="دسته بندی"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL, # اگر محصول حذف شود، این فیلد NULL شود
        null=True,
        blank=True,
        related_name='shipping_costs',
        verbose_name="محصول"
    )

    min_weight_g = models.IntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)], # وزن نباید منفی باشد
        verbose_name="حداقل وزن (گرم)"
    )
    max_weight_g = models.IntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        verbose_name="حداکثر وزن (گرم)"
    )

    min_price = models.DecimalField(
        max_digits=10, # حداکثر 10 رقم (مثال: 99,999,999.99)
        decimal_places=2, # دو رقم اعشار برای پول
        null=True,
        blank=True,
        validators=[MinValueValidator(0)], # قیمت نباید منفی باشد
        verbose_name="حداقل قیمت سفارش"
    )
    max_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        verbose_name="حداکثر قیمت سفارش"
    )

    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="هزینه ارسال"
    )

    is_active = models.BooleanField(default=True, verbose_name="فعال")
    
    priority = models.IntegerField(
        default=100,
        help_text="عدد کمتر به معنی اولویت بالاتر است. (0 = بالاترین اولویت)",
        verbose_name="اولویت"
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    class Meta:
        verbose_name = "هزینه ارسال"
        verbose_name_plural = "هزینه های ارسال"
        ordering = ['priority', '-created_at'] 
