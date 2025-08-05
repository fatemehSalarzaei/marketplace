from rest_framework import serializers
from django.utils import timezone

from Payments.models import Payment

class AdminPaymentReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'is_approved_by_admin', 'admin_note']

    def validate(self, attrs):
        # ادمین فقط می‌تواند تایید یا رد بزند
        if 'is_approved_by_admin' not in attrs:
            raise serializers.ValidationError("فیلد تایید باید مشخص شود.")
        return attrs

    def update(self, instance, validated_data):
        instance.is_approved_by_admin = validated_data.get('is_approved_by_admin', instance.is_approved_by_admin)
        instance.admin_note = validated_data.get('admin_note', instance.admin_note)
        instance.admin_reviewed_at = timezone.now()

        # اگر تایید شد، وضعیت پرداخت هم به موفق تغییر کند
        if instance.is_approved_by_admin:
            instance.status = 'success'
            if instance.order is not None:
                instance.order.status = 'paid'
                instance.order.save()
        else:
            instance.status = 'failed'

        instance.is_manual_review_required = False  # بررسی دستی انجام شده
        instance.save()
        return instance
