import os
from django.db import models
from datetime import date
from utils.imageUtils import compress_image

def upload_images_to_with_date(instance, filename):
    today = date.today().strftime('%Y%m%d')  # پوشه با نام تاریخ امروز
    return os.path.join('prouducts/images', today, filename)

def upload_video_to_with_date(instance, filename):
    today = date.today().strftime('%Y%m%d')  # پوشه با نام تاریخ امروز
    return os.path.join('prouducts/videos', today, filename)

class ImageAsset(models.Model):
    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=500, blank=True)
    long_description = models.TextField(blank=True)
    image = models.ImageField(upload_to=upload_images_to_with_date)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.image:
            self.image = compress_image(self.image)
        super().save(*args, **kwargs)


class VideoAsset(models.Model):
    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=500, blank=True)
    long_description = models.TextField(blank=True)
    video = models.FileField(upload_to=upload_video_to_with_date)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    