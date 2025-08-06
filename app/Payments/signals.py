from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from .models import Invoice
from utils.generateInvoicePdf import generate_invoice_pdf
from django.core.files.base import ContentFile


def generate_and_save_invoice(invoice):
    context = {
        'invoice': invoice,
        'order': invoice.order,
        'user': invoice.user,
    }
    pdf_bytes = generate_invoice_pdf(context)

    if pdf_bytes:
        file_name = f"invoice-{invoice.order.order_number}.pdf"
        invoice.pdf_file.save(file_name, ContentFile(pdf_bytes), save=False)
        invoice.save(update_fields=['pdf_file'])


@receiver(post_save, sender=Invoice)
def invoice_post_save(sender, instance, created, **kwargs):
    # بررسی وجود فِلَگ جلوگیری از فراخوانی مجدد سیگنال
    if kwargs.get('raw', False):
        return  # هنگام لود دیتابیس از fixtures

    if getattr(instance, '_pdf_generating', False):
        return  # اگر قبلاً در حال تولید PDF بودیم، جلوگیری از حلقه

    def task():
        # علامت‌گذاری روی شیء برای جلوگیری از recursion
        setattr(instance, '_pdf_generating', True)
        try:
            generate_and_save_invoice(instance)
        finally:
            setattr(instance, '_pdf_generating', False)

    transaction.on_commit(task)
