from rest_framework import serializers
from Accounts.models import ModelAccessPermission

class ModelAccessPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelAccessPermission
        fields = ['id', 'name', 'code']
