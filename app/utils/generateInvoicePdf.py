from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa

def generate_invoice_pdf(context, template_name='templates/invoices/invoice_template.html'):
    template = get_template(template_name)
    html = template.render(context)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    if not pdf.err:
        return result.getvalue()
    
    return None
