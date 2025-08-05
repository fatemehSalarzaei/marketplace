# serializers.py

from rest_framework import serializers
import re
from django.utils import timezone

from Accounts.models import PhoneCode, User
from Accounts import utils


class SendCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11)

    def validate_phone_number(self, value):
        if not re.fullmatch(r'^09\d{9}$', value):
            raise serializers.ValidationError("شماره تماس معتبر نیست. باید با 09 شروع شود و فقط شامل عدد باشد.")
        return value


class VerifyCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11)
    code = serializers.CharField(max_length=6)
    def validate_phone_number(self, value):
        if not re.fullmatch(r'^09\d{9}$', value):
            raise serializers.ValidationError("شماره تماس معتبر نیست. باید با 09 شروع شود و فقط شامل عدد باشد.")
        return value
    
    def validate(self, data):
        phone_number = data.get("phone_number")
        code = data.get("code")
        try:
            phone_code = PhoneCode.objects.get(phone_number=phone_number)
        except PhoneCode.DoesNotExist:
            raise serializers.ValidationError({"detail": "کدی برای این شماره وجود ندارد"})
        if not phone_code.check_password(code):
            raise serializers.ValidationError({"detail": "کد وارد شده نادرست یا منقضی شده است"})

        return data
