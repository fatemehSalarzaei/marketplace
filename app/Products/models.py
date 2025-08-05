from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator
from django.core.mail import send_mail
from django.conf import settings

from utils.imageUtils import compress_image
from MediaApp.models import VideoAsset , ImageAsset


class Product(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    AVAILABILITY_CHOICES = [
        ('in_stock', 'موجود'),
        ('out_of_stock', 'ناموجود'),
        ('pre_order', 'پیش‌فروش'),
    ]


    product_code = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey('Categories.Category', null=True, blank=True , on_delete=models.PROTECT, related_name='products')
    brand = models.ForeignKey('Brands.Brand', on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    tags = models.ManyToManyField('Tags.Tag', related_name='tagged_products', blank=True)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    short_description = models.CharField(max_length=500, blank=True)
    long_description = models.TextField(blank=True)
    # attributes = models.ManyToManyField('Attributes.Attribute', related_name='products', blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    availability_status = models.CharField(
        max_length=20,
        choices=AVAILABILITY_CHOICES,
        default='in_stock',
    )
    main_image = models.ImageField(upload_to='products/main_images/', null=True, blank=True)
    min_order_quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    max_order_quantity = models.PositiveIntegerField(default=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if self.main_image:
            self.main_image = compress_image(self.main_image)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductGalleryImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image_asset = models.ForeignKey(
        ImageAsset,
        on_delete=models.CASCADE,
        related_name='product_gallery_images'
    )
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Gallery image for {self.product.name}"
    

class ProductVideo(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="videos")

    video_asset = models.ForeignKey(
        VideoAsset,
        on_delete=models.CASCADE,
        related_name="product_videos"
    )    
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Video for {self.product.name}"


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)    
    image = models.ImageField(upload_to='product_variants/', null=True, blank=True)
    low_stock_threshold = models.PositiveIntegerField(default=5)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} - {self.sku}"
    
    def save(self, *args, **kwargs):
            
        low_stock_before = None
        if self.pk:
            old = ProductVariant.objects.get(pk=self.pk)
            low_stock_before = old.stock <= old.low_stock_threshold

        if self.image:
            self.image = compress_image(self.image)
        super().save(*args, **kwargs)
        
    # بررسی کاهش موجودی
        if self.stock <= self.low_stock_threshold and not low_stock_before:
            # ایجاد هشدار (مثلاً ایمیل)
            send_mail(
                subject='⚠️ هشدار کاهش موجودی محصول',
                message=f'موجودی محصول {self.product.name} (SKU: {self.sku}) کمتر از حد مجاز شده است.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.MANAGER_EMAIL],  # ایمیل مدیر سیستم
            )


class ProductVariantGalleryImage(models.Model):
    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name='gallery_images'
    )

    image_asset = models.ForeignKey(
        ImageAsset,
        on_delete=models.CASCADE,
        related_name='variant_gallery_images'
    )
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Gallery image for {self.product_variant}"

    def save(self, *args, **kwargs):
        if self.image:
            self.image = compress_image(self.image)
        super().save(*args, **kwargs)


class ProductAttributeValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attribute_values')
    attribute = models.ForeignKey('Attributes.Attribute', on_delete=models.CASCADE, related_name='product_values')
   
    predefined_value = models.ForeignKey(
        'Attributes.AttributeValue',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='product_attribute_values'
    )
    value = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        unique_together = ('product', 'attribute')

    def __str__(self):
        return f"{self.product.name} - {self.attribute.name}: {self.value}"

class ProductVariantAttribute(models.Model):
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name="variant_attributes")
    attribute_value = models.ForeignKey('Attributes.AttributeValue', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('product_variant', 'attribute_value')

    def __str__(self):
        return f"{self.product_variant} - {self.attribute_value}"
class StockAlert(models.Model):
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='stock_alerts')
    triggered_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField()

    def __str__(self):
        return f"هشدار برای {self.variant.sku} در {self.triggered_at}"
