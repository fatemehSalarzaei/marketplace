from rest_framework import serializers
from Addresses.models import Address
import re

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def validate(self, data):
        user = self.context['request'].user
        if self.instance is None and Address.objects.filter(user=user).count() >= 10:
            raise serializers.ValidationError("شما نمی‌توانید بیش از ۱۰ آدرس داشته باشید.")

        phone = data.get('phone_number')
        postal = data.get('postal_code')
        if phone and not re.fullmatch(r'09\d{9}', phone):
            raise serializers.ValidationError({'phone_number': 'شماره تماس معتبر نیست.'})
        if postal and not re.fullmatch(r'\d{10}', postal):
            raise serializers.ValidationError({'postal_code': 'کد پستی معتبر نیست.'})

        return data

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user

        if Address.objects.filter(user=user).count() == 0:
            validated_data['is_default'] = True

        address = super().create(validated_data)

        if address.is_default:
            Address.objects.filter(user=user).exclude(id=address.id).update(is_default=False)

        return address

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        if instance.is_default:
            Address.objects.filter(user=instance.user).exclude(id=instance.id).update(is_default=False)

        return instance
