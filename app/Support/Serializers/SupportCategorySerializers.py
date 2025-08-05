from rest_framework import serializers
from Support.models import SupportCategory

class SupportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportCategory
        fields = ['id', 'name', 'description']
