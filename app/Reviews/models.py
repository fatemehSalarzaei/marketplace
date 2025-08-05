from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Review(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'در انتظار تایید'),
        (STATUS_APPROVED, 'تایید شده'),
        (STATUS_REJECTED, 'رد شده'),
    ]

    product = models.ForeignKey('Products.Product', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField()  # امتیاز 1 تا 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')

    def __str__(self):
        return f'Review by {self.user} on {self.product}'

    class Meta:
        ordering = ['-created_at']
        unique_together = ('product', 'user', 'parent')


class OrderItemReview(models.Model):
    order_item = models.OneToOneField('Orders.OrderItem', on_delete=models.CASCADE, related_name='review')
    user = models.ForeignKey(User ,  on_delete=models.CASCADE, related_name='order_item_reviews')
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'ItemReview by {self.user} on Item #{self.order_item.id}'
