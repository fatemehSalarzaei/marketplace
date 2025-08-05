# Products/serializers/admin/attribute_value_serializer.py

from rest_framework import serializers
from Attributes.models import AttributeValue

class AttributeValueAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = '__all__'
