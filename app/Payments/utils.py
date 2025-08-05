from django.core.files.base import ContentFile
from app.utils.generateInvoicePdf import generate_invoice_pdf

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
