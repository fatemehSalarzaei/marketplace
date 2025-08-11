from rest_framework import serializers
from PageBuilder.models import Element, ElementType, HomePage

class ElementSerializer(serializers.ModelSerializer):
    element_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=ElementType.objects.all()
    )
    page = serializers.PrimaryKeyRelatedField(
        queryset=HomePage.objects.filter(is_active=True),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Element
        fields = [
            'id',
            'name',
            'display_title',
            'element_type',
            'position',
            'display_style',
            'section',
            'is_active',
            'start_at',
            'end_at',
            'html_content',
            'page',
        ]

    def create(self, validated_data):
        # اگر page ارسال نشده بود
        if 'page' not in validated_data or validated_data['page'] is None:
            # آخرین صفحه فعال را می‌گیریم
            active_page = HomePage.objects.filter(is_active=True).order_by('-id').first()
            if active_page:
                validated_data['page'] = active_page

        return super().create(validated_data)
