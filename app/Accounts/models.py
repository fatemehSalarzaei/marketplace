from uuid import uuid4

from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from datetime import timedelta

from Accounts import utils
from utils.imageUtils import compress_image


# سطح دسترسی‌ها
class ModelAccessPermission(models.Model):
    name = models.CharField(max_length=100, unique=True)  # مثلا: Product یا Order
    code = models.CharField(max_length=100, unique=True)  # مثلاً: product

    def __str__(self):
        return self.name



# نقش‌ها
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def has_model_permission(self, model_code, action):
        try:
            perm = self.model_permissions.select_related('model').get(model__code=model_code)
            return getattr(perm, f'can_{action}', False)
        except RoleModelPermission.DoesNotExist:
            return False

class RoleModelPermission(models.Model):
    role = models.ForeignKey("Role", on_delete=models.CASCADE, related_name="model_permissions")
    model = models.ForeignKey(ModelAccessPermission, on_delete=models.CASCADE)
    can_create = models.BooleanField(default=False)
    can_read = models.BooleanField(default=True)
    can_update = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)

    class Meta:
        unique_together = ('role', 'model')

class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number is required")
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(phone_number, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(
        unique=True,
        max_length=15,
        blank=False,
        validators=[
            RegexValidator(
                    regex=r'^09\d{9}$',
                    message='شماره تماس باید با 09 شروع شود و دقیقاً 11 رقم عددی باشد.'
                )
        ]
    )
    national_code = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        validators=[RegexValidator(r'^\d{10}$', message="کد ملی باید ۱۰ رقم باشد")]
    )
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(unique=False, blank=True, null=True)      
    birth_date = models.DateField(blank=True, null=True)  
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')

    objects = UserManager()

    USERNAME_FIELD = "phone_number"

    def __str__(self):
        return self.phone_number

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def has_model_permission(self, model_code, action):
        if self.role:
            return self.role.has_model_permission(model_code, action)


class PhoneCode(models.Model):
    phone_number = models.CharField(
        max_length=11,
        null=True,
        blank=True,
        verbose_name='phone number',
        unique=True,
        validators=[
            RegexValidator(r'09\d{9}'),
        ],
    )
    tmp_code = models.CharField(max_length=6, default=utils.password_generator)
    tmp_code_expire = models.DateTimeField(default=timezone.now)
    tmp_code_sent_time = models.DateTimeField(default=utils.five_minute_ago)
    tmp_code_sent_counter_in_last_24_hour = models.IntegerField(default=0)

    def check_password(self, password):
        if self.tmp_code_expire > timezone.now() and self.tmp_code == password:
            return True
        return False

    def __can_request_sms(self):
        now = timezone.now()

        if self.tmp_code_sent_time + timedelta(minutes=2) > now:
            return False

        if self.tmp_code_sent_time.date() == now.date() and self.tmp_code_sent_counter_in_last_24_hour >= 10:
            return False

        return True

    def limitations_check(self):
        condition = self.__can_request_sms()
        if condition is None:
            return True
        elif condition:
            if self.tmp_code_sent_time.date() == timezone.now().date():
                self.tmp_code_sent_counter_in_last_24_hour += 1
            else:
                self.tmp_code_sent_counter_in_last_24_hour = 1
            self.save()
            return True
        return False
    



class UserActivityLog(models.Model):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action} at {self.created_at}"
