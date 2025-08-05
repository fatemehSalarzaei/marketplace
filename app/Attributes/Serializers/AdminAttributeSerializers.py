# serializers/admin/attribute.py
from rest_framework import serializers
from Attributes.models import Attribute
from .AttributeValueAdminSerializers import AttributeValueAdminSerializer

class AdminAttributeSerializer(serializers.ModelSerializer):
    values = AttributeValueAdminSerializer(many=True, read_only=True)

    class Meta:
        model = Attribute
        fields = ['id', 'name', 'slug', 'use_predefined_values', 'for_variant' ,'values']
