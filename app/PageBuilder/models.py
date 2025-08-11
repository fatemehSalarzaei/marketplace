from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class HomePage(models.Model):
    name = models.CharField(max_length=100, unique=True)  # مثلاً default یا norooz_campaign
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ElementType(models.Model):
    """
    مشخص می‌کند که هر نوع المان (ElementType) به کدام مدل داده‌ها مربوط است.
    """
    name = models.CharField(max_length=100, unique=True)  # مثلاً Banner, Product, Category, Html, Text
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name


class Element(models.Model):
    """
    مدل المان‌های صفحه اصلی. هر المان یک بخش از صفحه است که می‌تواند انواع مختلفی داشته باشد.
    """
    DISPLAY_STYLES = [
        ('slider', 'اسلایدر'),
        ('grid', 'شبکه‌ای (Grid)'),
        ('list', 'لیست ساده'),
        ('carousel', 'چرخان'),
        ('masonry', 'ماسنری'),
        ('tabs', 'تب‌ها'),
        ('accordion', 'آکاردئون'),
        ('html', 'محتوای HTML خام'),
        ('banner', 'بنر تبلیغاتی'),
        ('product_highlight', 'محصول برجسته'),
        ('video', 'ویدیو'),
        ('text', 'متن ساده'),
        ('gallery', 'گالری تصاویر'),
        ('countdown', 'شمارش معکوس'),
        ('testimonial', 'نظرات مشتریان'),
        ('category_list', 'لیست دسته‌بندی‌ها'),
    ]

    SECTION_CHOICES = [
        ('header', 'بالای صفحه'),
        ('middle', 'میان صفحه'),
        ('footer', 'پایین صفحه'),
    ]
    page = models.ForeignKey('HomePage', on_delete=models.CASCADE, related_name='elements')
    name = models.CharField(max_length=100, unique=True)
    display_title = models.CharField(max_length=200, blank=True, null=True)
    element_type = models.ForeignKey(ElementType, on_delete=models.PROTECT)
    position = models.PositiveIntegerField(default=0)
    display_style = models.CharField(max_length=50, choices=DISPLAY_STYLES, default='grid')
    section = models.CharField(max_length=50, choices=SECTION_CHOICES, default='middle')
    is_active = models.BooleanField(default=True)
    start_at = models.DateTimeField(null=True, blank=True)
    end_at = models.DateTimeField(null=True, blank=True)

    # فیلد محتوای HTML مخصوص المان‌هایی که display_style برابر html دارند
    html_content = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.element_type.name})"
    class Meta:
        ordering = ['position']


class ElementItem(models.Model):
    """
    آیتم‌های مربوط به هر المان. می‌توانند داده‌های دینامیک از مدل‌های دیگر یا داده‌های استاتیک باشند.
    """
    element = models.ForeignKey(Element, related_name='items', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=True, null=True)
    position = models.PositiveIntegerField(default=0)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    extra_data = models.JSONField(null=True, blank=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Item {self.id} for {self.element.name}"
    class Meta:
        ordering = ['position']