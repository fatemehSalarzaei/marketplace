# recent_views/models.py
from django.db import models
from django.conf import settings
from Products.models import Product

class RecentView(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recent_views"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="recent_views"
    )
    viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-viewed_at"]
        unique_together = ("user", "product")

    def __str__(self):
        return f"{self.user} viewed {self.product} at {self.viewed_at}"
