from django.db import models
from django.utils.text import slugify

from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/images/', blank=True, null=True)
    icon = models.ImageField(upload_to='categories/icons/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    
    meta_title = models.CharField(max_length=150, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_full_path(self):
        """نمایش مسیر کامل مانند: الکترونیک / موبایل / سامسونگ"""
        categories = [self.name]
        parent = self.parent
        while parent:
            categories.append(parent.name)
            parent = parent.parent
        return ' / '.join(reversed(categories))

    def get_ancestors_tree_bottom_up(self):
        if not self.parent:
            return {
                "id": self.id,
                "name": self.name,
                "slug": self.slug,
                "parent": None,
            }
        else:
            return {
                "id": self.id,
                "name": self.name,
                "slug": self.slug,
                "parent": self.parent.get_ancestors_tree_bottom_up()
            }
