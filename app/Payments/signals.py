from django.db.models.signals import post_save
from django.dispatch import receiver
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
        invoice.pdf_file.save(file_name, ContentFile(pdf_bytes), save=True)

@receiver(post_save, sender=Invoice)
def invoice_post_save(sender, instance, created, **kwargs):
    # وقتی یک اینوایس ساخته یا آپدیت شد، فایل PDF تولید و ذخیره شود
    generate_and_save_invoice(instance)
