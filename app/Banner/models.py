from django.db import models

class Banner(models.Model):
    BANNER_TYPES = [
        ('slider', 'اسلایدر'),
        ('fixed', 'بنر ثابت'),
        ('popup', 'پاپ‌آپ'),
        ('sidebar', 'سایدبار'),
    ]

    title = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='banners/')
    url = models.URLField(blank=True, null=True, help_text='آدرس مقصد هنگام کلیک روی بنر')
    banner_type = models.CharField(max_length=50, choices=BANNER_TYPES, default='slider')
    position = models.PositiveIntegerField(default=0, help_text='ترتیب نمایش')
    is_active = models.BooleanField(default=True)
    start_at = models.DateTimeField(null=True, blank=True, help_text='زمان شروع نمایش بنر')
    end_at = models.DateTimeField(null=True, blank=True, help_text='زمان پایان نمایش بنر')

    def __str__(self):
        return self.title or f"Banner #{self.id}"
