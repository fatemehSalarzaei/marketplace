# serializers.py
from rest_framework import serializers
from Accounts.models import RoleModelPermission
from .ModelAccessPermissionSerializers import ModelAccessPermissionSerializer



class MyRolePermissionSerializer(serializers.ModelSerializer):
    model = ModelAccessPermissionSerializer(read_only=True)

    class Meta:
        model = RoleModelPermission
        fields = ['model', 'can_create', 'can_read', 'can_update', 'can_delete']


