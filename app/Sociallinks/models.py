from django.db import models

class SocialLink(models.Model):
    class Platform(models.TextChoices):
        WHATSAPP = 'whatsapp', 'واتساپ'
        TELEGRAM = 'telegram', 'تلگرام'
        INSTAGRAM = 'instagram', 'اینستاگرام'
        LINKEDIN = 'linkedin', 'لینکدین'
        FACEBOOK = 'facebook', 'فیسبوک'
        OTHER = 'other', 'سایر'

    platform = models.CharField(max_length=20, choices=Platform.choices)
    display_name = models.CharField(max_length=100)  # برای عنوان نمایشی مثلاً "پشتیبانی در واتساپ"
    value = models.CharField(max_length=255)  # شماره یا یوزرنیم یا لینک مستقیم
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)  # برای مرتب‌سازی در نمایش

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_link(self):
        if self.platform == self.Platform.WHATSAPP:
            return f"https://wa.me/{self.value}"
        elif self.platform == self.Platform.TELEGRAM:
            return f"https://t.me/{self.value}"
        elif self.platform == self.Platform.INSTAGRAM:
            return f"https://instagram.com/{self.value}"
        elif self.platform == self.Platform.LINKEDIN:
            return f"https://linkedin.com/in/{self.value}"
        elif self.platform == self.Platform.FACEBOOK:
            return f"https://facebook.com/{self.value}"
        return self.value  # در صورتی که از نوع other باشه

    def __str__(self):
        return f"{self.get_platform_display()} - {self.display_name}"

    class Meta:
        ordering = ['order']
