from django.db import models
from django.core.validators import RegexValidator
from django.conf import settings



class Province(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100)
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='cities')

    class Meta:
        unique_together = ('name', 'province')

    def __str__(self):
        return f"{self.name}, {self.province.name}"


class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='addresses')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20, 
                    validators=[RegexValidator(regex=r'^\d{10}$', 
                    message="کد پستی باید 10 رقم باشد.")])
    phone_number = models.CharField(max_length=15, blank=True, 
                    validators=[RegexValidator(regex=r'^09\d{9}$', 
                    message="شماره تماس باید با 09 شروع شده و 11 رقم باشد.")])
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_default', '-created_at']

    def save(self, *args, **kwargs):
        if self.is_default:
            Address.objects.filter(user=self.user, is_default=True).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.street_address}, {self.city}"