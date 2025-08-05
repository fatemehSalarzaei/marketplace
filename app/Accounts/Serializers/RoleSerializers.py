from rest_framework import serializers
from Accounts.models import Role, RoleModelPermission, ModelAccessPermission

class ModelAccessPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelAccessPermission
        fields = ['id', 'name', 'code']

class RoleModelPermissionSerializer(serializers.ModelSerializer):
    model = ModelAccessPermissionSerializer(read_only=True)
    model_id = serializers.PrimaryKeyRelatedField(
        queryset=ModelAccessPermission.objects.all(),
        source='model',
        write_only=True
    )

    can_create = serializers.BooleanField(default=False)
    can_read = serializers.BooleanField(default=False)
    can_update = serializers.BooleanField(default=False)
    can_delete = serializers.BooleanField(default=False)

    class Meta:
        model = RoleModelPermission
        fields = ['id', 'model', 'model_id', 'can_create', 'can_read', 'can_update', 'can_delete']

class RoleSerializer(serializers.ModelSerializer):
    model_permissions = RoleModelPermissionSerializer(many=True)

    class Meta:
        model = Role
        fields = ['id', 'name', 'description', 'model_permissions']

    def create(self, validated_data):
        permissions_data = validated_data.pop('model_permissions', [])
        role = Role.objects.create(**validated_data)
        for perm_data in permissions_data:
            RoleModelPermission.objects.create(role=role, **perm_data)
        return role

    def update(self, instance, validated_data):
        permissions_data = validated_data.pop('model_permissions', [])
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        # حذف مجوزهای قبلی
        instance.model_permissions.all().delete()

        # ایجاد مجوزهای جدید
        for perm_data in permissions_data:
            RoleModelPermission.objects.create(role=instance, **perm_data)

        return instance
