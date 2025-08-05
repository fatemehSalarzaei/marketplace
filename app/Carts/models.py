from django.db import models
from django.db.models import Q
from django.conf import settings
from Products.models import ProductVariant
from Discounts.models import DiscountCode  # اگر کد تخفیف سبد پشتیبانی شود
from django.core.exceptions import ValidationError
from decimal import Decimal, InvalidOperation

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # discount_code = models.ForeignKey(DiscountCode, on_delete=models.SET_NULL, null=True, blank=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user"], condition=Q(is_active=True), name="unique_active_cart_per_user")
        ]
    def __str__(self):
        identity = self.user if self.user else f"Session: {self.session_id}"
        return f"Cart #{self.id} - {identity}"

    def clean(self):
        if not self.user and not self.session_id:
            raise ValidationError("Either user or session_id must be set.")

    def update_total_price(self):
        total = Decimal('0')
        for item in self.items.all():
            total += item.get_total_price()
        self.total_price = total
        self.save(update_fields=["total_price"])

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_at_time = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('cart', 'product_variant')

    def __str__(self):
        return f"{self.product_variant} x {self.quantity}"

    def get_total_price(self):
        try:
            return Decimal(self.quantity) * Decimal(self.price_at_time)
        except (InvalidOperation, TypeError):
            return Decimal('0')

    def save(self, *args, **kwargs):
        if self.price_at_time is None:
            self.price_at_time = Decimal('0')
        else:
            try:
                self.price_at_time = Decimal(self.price_at_time)
            except (InvalidOperation, TypeError):
                self.price_at_time = Decimal('0')

        super().save(*args, **kwargs)
        self.cart.update_total_price()

    def delete(self, *args, **kwargs):
        cart = self.cart
        super().delete(*args, **kwargs)
        cart.update_total_price()
