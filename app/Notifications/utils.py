import requests
from django.core.mail import EmailMessage
from django.core.mail import mail_admins
from django.urls import reverse

from utils.generateInvoicePdf import generate_invoice_pdf
from Notifications.models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()

def send_sms_to_user(phone, message):
    sms_api_url = 'https://sms-provider.example.com/send'
    api_key = 'your_api_key_here'

    payload = {
        'receptor': phone,
        'message': message,
        'sender': '3000XXXXXX'
    }

    headers = {'apikey': api_key}

    try:
        response = requests.post(sms_api_url, json=payload, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print(f"خطا در ارسال پیامک: {e}")

def send_invoice_email(invoice):
    context = {
        'invoice': invoice,
        'order': invoice.order,
        'user': invoice.user,
    }
    pdf_content = generate_invoice_pdf(context)
    if pdf_content:
        email = EmailMessage(
            subject=f'فاکتور سفارش شما - {invoice.order.order_number}',
            body='لطفاً فایل فاکتور سفارش خود را در پیوست مشاهده کنید.',
            from_email='no-reply@yourstore.com',
            to=[invoice.user.email],
        )
        email.attach(f"invoice-{invoice.order.order_number}.pdf", pdf_content, 'application/pdf')
        email.send()

def send_admin_notification(message):
    # ارسال ایمیل به ادمین‌ها
    mail_admins(
        subject="درخواست برگشت سفارش",
        message=message
    )

    # در صورت نیاز، می‌توانی پیام را در مدل Notification هم ذخیره کنی
    # Notification.objects.create(title="درخواست برگشت", message=message, ...)

def notify_admins_about_return_request(return_request):
    order = return_request.order
    title = "درخواست برگشت سفارش"
    message = f"کاربر {return_request.user.get_full_name()} درخواست برگشت برای سفارش #{order.id} ثبت کرده است."
    link = reverse('admin:orders_returnrequest_change', args=[return_request.id])  # لینک به پنل ادمین

    # پیدا کردن کاربران ادمین
    admin_users = User.objects.filter(is_staff=True)

    for admin in admin_users:
        Notification.objects.create(
            user=admin,
            title=title,
            message=message,
            type='custom',
            channel='site',  # یا 'email' در صورت نیاز
            link=link
        )
