from rest_framework import serializers
from Payments.models import Payment

class PaymentReceiptUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'receipt_image', 'is_manual_review_required']

    def validate_receipt_image(self, value):
        if not value.name.lower().endswith(('.jpg', '.jpeg', '.png', '.pdf')):
            raise serializers.ValidationError("فرمت فایل باید jpg، jpeg، png یا pdf باشد.")
        return value

    def update(self, instance, validated_data):
        instance.receipt_image = validated_data.get('receipt_image', instance.receipt_image)
        instance.is_manual_review_required = validated_data.get('is_manual_review_required', instance.is_manual_review_required)
        instance.status = 'pending'  # با بارگذاری رسید، وضعیت در انتظار بررسی می‌ماند
        instance.is_approved_by_admin = False  # تا تایید ادمین، False بماند
        instance.admin_note = None
        instance.admin_reviewed_at = None
        instance.save()
        return instance
