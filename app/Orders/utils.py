from Orders.models import Order
from Payments.models import Invoice
from django.utils import timezone

def finalize_order(order_id, user):
    order = Order.objects.get(id=order_id, user=user)

    if order.status != 'pending':
        return {'error': 'سفارش در وضعیت قابل تأیید نیست.'}

    # تغییر وضعیت سفارش
    order.status = 'paid'
    order.is_paid = True
    order.save()

    # ایجاد فاکتور در صورت عدم وجود
    invoice, created = Invoice.objects.get_or_create(
        order=order,
        user=order.user,
        defaults={'total_amount': order.final_price}
    )

    # ارسال پیامک
    send_sms_to_user(order.user.phone_number, f"سفارش شما با شماره {order.order_number} با موفقیت ثبت شد.")

    return {'success': True, 'invoice_id': invoice.id}
