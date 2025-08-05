from rest_framework import serializers
import re
from datetime import date

from Accounts.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(read_only=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email',
            'national_code',
            'phone_number',
            'avatar',
            'birth_date',   
        ]
        read_only_fields = ['phone_number']

    def validate_national_code(self, value):
        if value is None or value is "":
            return None
        if not re.fullmatch(r'^\d{10}$', value):
            raise serializers.ValidationError("کد ملی باید 10 رقم عددی باشد.")
        return value
    
    def validate_birth_date(self, value):
        if value is None or value is "":
            return None

        today = date.today()

        if value > today:
            raise serializers.ValidationError("تاریخ تولد نمی‌تواند در آینده باشد.")

        min_age = 13
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < min_age:
            raise serializers.ValidationError(f"سن شما باید حداقل {min_age} سال باشد.")

        return value