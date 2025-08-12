from rest_framework import serializers
from Payments.models import Payment, PaymentMethod, PaymentStatus

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    payment_gateway = serializers.StringRelatedField()
    payment_method_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    order_number = serializers.SerializerMethodField()
    class Meta:
        model = Payment
        fields = [
            'id',
            'user',
            'invoice',
            'payment_gateway',
            'payment_method',
            'payment_method_display',
            'status',
            'status_display',
            'amount',
            'currency',
            'transaction_id',
            'payment_date',
            'refunded',
            'refunded_date',
            'is_manual_review_required',
            'is_approved_by_admin',
            'admin_note',
            'order_number',
        ]
        read_only_fields = fields

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
            'email': obj.user.email,
        }
    
    def get_order_number(self ,obj):
        if obj.invoice and obj.invoice.order:
            return obj.invoice.order.order_number
        return None
            


    def get_payment_method_display(self, obj):
        return obj.get_payment_method_display()

    def get_status_display(self, obj):
        return obj.get_status_display()
