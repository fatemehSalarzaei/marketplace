from rest_framework import serializers
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model
from Accounts.models import Role
from Addresses.models import Province, City, Address

User = get_user_model()

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ['id', 'name']

class CitySerializer(serializers.ModelSerializer):
    province = ProvinceSerializer(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'province']

class AddressSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)

    class Meta:
        model = Address
        fields = [
            'id',
            'first_name',
            'last_name',
            'city',
            'street_address',
            'postal_code',
            'phone_number',
            'is_default',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=False,
        allow_null=True
    )
    role_name = serializers.CharField(source='role.name', read_only=True, required=False)

    addresses = AddressSerializer(many=True, read_only=True)

    # اضافه کردن فیلد is_superuser
    is_superuser = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "phone_number",
            "national_code",
            "first_name",
            "last_name",
            "email",
            "birth_date",
            "avatar",
            "is_active",
            "is_staff",
            "is_superuser",  # اضافه شده
            "date_joined",
            "role",
            "role_name",
            "password",
            "addresses",
        ]
        read_only_fields = ["id", "date_joined"]

        extra_kwargs = {
            "password": {"write_only": True , 
                    "required": False,  },
            "phone_number": {
                "validators": [
                    RegexValidator(
                        regex=r"^09\d{9}$",
                        message="شماره تماس باید با 09 شروع شود و دقیقاً 11 رقم عددی باشد."
                    )
                ],
                "required": True,
                "error_messages": {
                    "unique": "یک کاربر با این شماره تماس قبلاً ثبت شده است."
                }
            },
            "national_code": {
                "validators": [RegexValidator(r"^\d{10}$", message="کد ملی باید ۱۰ رقم باشد")],
                "required": False,
                "allow_null": True,
                "allow_blank": True,
                "error_messages": {
                    "unique": "یک کاربر با این کد ملی قبلاً ثبت شده است."
                }
            },
            "email": {
                "required": False,
                "allow_null": True,
                "allow_blank": True,
                "error_messages": {
                    "unique": "یک کاربر با این آدرس ایمیل قبلاً ثبت شده است."
                }
            },
            "avatar": {
                "required": False,
                "allow_null": True,
            }
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        is_staff = validated_data.pop("is_staff", False)
        is_superuser = validated_data.pop("is_superuser", False)

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        is_staff = validated_data.pop("is_staff", None)
        is_superuser = validated_data.pop("is_superuser", None)

        if password:
            instance.set_password(password)

        if is_staff is not None:
            instance.is_staff = is_staff

        if is_superuser is not None:
            instance.is_superuser = is_superuser

        return super().update(instance, validated_data)

    def validate_phone_number(self, value):
        if self.instance and self.instance.phone_number != value and User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("این شماره تماس قبلاً ثبت شده است.")
        return value

    def validate_national_code(self, value):
        if value and self.instance and self.instance.national_code != value and User.objects.filter(national_code=value).exists():
            raise serializers.ValidationError("این کد ملی قبلاً ثبت شده است.")
        return value
