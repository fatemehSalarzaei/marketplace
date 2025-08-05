from django.db import models
from django.conf import settings


class Notification(models.Model):
    CHANNEL_CHOICES = [
        ('site', 'درون سایت'),
        ('email', 'ایمیل'),
        ('sms', 'پیامک'),
    ]

    TYPE_CHOICES = [
        ('order_status', 'وضعیت سفارش'),
        ('discount', 'تخفیف'),
        ('review_reply', 'پاسخ به نظر'),
        ('custom', 'سفارشی'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='custom')
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES, default='site')
    is_read = models.BooleanField(default=False)
    link = models.URLField(max_length=500, null=True, blank=True, )
    expires_at = models.DateTimeField(null=True, blank=True, )
    created_at = models.DateTimeField(auto_now_add=True)
    scheduled_at = models.DateTimeField(null=True, blank=True)  # برای ارسال با تاخیر

    def __str__(self):
        return f"{self.user.username} - {self.title} ({self.channel})"
