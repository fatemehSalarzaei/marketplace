from rest_framework import serializers


class FilterOptionSerializer(serializers.Serializer):
    slug = serializers.CharField(required=False)  

    title = serializers.CharField()
    values = serializers.SerializerMethodField()

    def get_values(self, obj):
        return obj.get("values", [])
