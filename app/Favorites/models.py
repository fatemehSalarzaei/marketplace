# models.py

from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from Products.models import Product, ProductVariant

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorites')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'product'], name='unique_user_product_favorite'),
            models.UniqueConstraint(fields=['user', 'variant'], name='unique_user_variant_favorite'),
        ]
        ordering = ['-created_at']

    def clean(self):
        if not self.product and not self.variant:
            raise ValidationError("Either product or variant must be set.")
        if self.product and self.variant:
            raise ValidationError("You can only favorite either a product or a variant, not both.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        if self.variant:
            return f"{self.user} - Variant: {self.variant.id}"
        return f"{self.user} - Product: {self.product.name}"
