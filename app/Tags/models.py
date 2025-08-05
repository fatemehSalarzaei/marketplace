from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True)  # برای URL و جستجو
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class TagCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# # اگر بخواهیم برچسب‌ها را به دسته‌ها مرتبط کنیم
# Tag.add_to_class('category', models.ForeignKey(TagCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='tags'))
