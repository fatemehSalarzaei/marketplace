from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.utils.dateparse import parse_date

from Orders.models import Order
from Payments.models import Payment, Invoice
from Shipping.models import ShippingMethod

@api_view(['GET'])
def financial_logistics_report(request):
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    orders = Order.objects.all()
    payments = Payment.objects.all()
    invoices = Invoice.objects.all()
    shipping_methods = ShippingMethod.objects.all()

    if start_date:
        orders = orders.filter(created_at__date__gte=parse_date(start_date))
        payments = payments.filter(payment_date__date__gte=parse_date(start_date))
        invoices = invoices.filter(created_at__date__gte=parse_date(start_date))
    if end_date:
        orders = orders.filter(created_at__date__lte=parse_date(end_date))
        payments = payments.filter(payment_date__date__lte=parse_date(end_date))
        invoices = invoices.filter(created_at__date__lte=parse_date(end_date))

    total_order_count = orders.count()
    total_paid_orders = orders.filter(is_paid=True).count()
    total_revenue = payments.filter(status='success').aggregate(total=Sum('amount'))['total'] or 0
    total_refunded = payments.filter(status='refunded').aggregate(total=Sum('amount'))['total'] or 0
    total_invoices = invoices.count()

    # وضعیت سفارشات بر اساس ارسال
    shipping_status_counts = orders.values('status').annotate(count=Count('id'))
    status_summary = {status: 0 for status, _ in Order.STATUS_CHOICES}
    for item in shipping_status_counts:
        status_summary[item['status']] = item['count']

    # جمع تعداد سفارش‌ها به تفکیک روش ارسال
    shipping_method_counts = orders.values('shipping_method__name').annotate(count=Count('id'))

    shipping_methods_summary = []
    for sm in shipping_method_counts:
        shipping_methods_summary.append({
            'shipping_method': sm['shipping_method__name'] or 'بدون روش ارسال',
            'order_count': sm['count']
        })

    return Response({
        'total_order_count': total_order_count,
        'total_paid_orders': total_paid_orders,
        'total_revenue': total_revenue,
        'total_refunded': total_refunded,
        'total_invoices': total_invoices,
        'order_status_summary': status_summary,
        'shipping_methods_summary': shipping_methods_summary,
    })
