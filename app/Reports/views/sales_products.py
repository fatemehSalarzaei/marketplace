# reports/api.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count, Q, F
from django.utils.dateparse import parse_date
from Orders.models import Order, OrderItem, Payment
from Products.models import ProductVariant
from django.db.models import Sum, Count
from django.utils.dateparse import parse_date
from django.db.models.functions import TruncDay
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Orders.models import Order
from Payments.models import Payment, PaymentStatus

@api_view(['GET'])
def sales_report(request):
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    orders = Order.objects.all()
    payments = Payment.objects.all()

    if start_date:
        orders = orders.filter(created_at__date__gte=parse_date(start_date))
        payments = payments.filter(payment_date__date__gte=parse_date(start_date))
    if end_date:
        orders = orders.filter(created_at__date__lte=parse_date(end_date))
        payments = payments.filter(payment_date__date__lte=parse_date(end_date))

    total_revenue = orders.filter(is_paid=True).aggregate(total=Sum('final_price'))['total'] or 0
    total_orders = orders.count()
    total_paid_orders = orders.filter(is_paid=True).count()
    total_refunded_amount = payments.filter(status='refunded').aggregate(total=Sum('amount'))['total'] or 0

    orders_by_status = orders.values('status').annotate(count=Count('id'))
    status_counts = {status: 0 for status, _ in Order.STATUS_CHOICES}
    for item in orders_by_status:
        status_counts[item['status']] = item['count']

    payments_summary = payments.values('status').annotate(count=Count('id'), sum_amount=Sum('amount'))
    payment_counts = {status: 0 for status, _ in PaymentStatus.choices}
    payment_amount = 0
    for item in payments_summary:
        payment_counts[item['status']] = item['count']
        payment_amount += item['sum_amount'] or 0

    # محاسبه روند فروش روزانه (مجموع فروش روزانه)
    sales_trend = (
        orders
        .filter(is_paid=True)
        .annotate(day=TruncDay('created_at'))
        .values('day')
        .annotate(total_sales=Sum('final_price'))
        .order_by('day')
    )
    sales_trend_data = [
        {
            "date": item['day'].strftime('%Y-%m-%d'),
            "total_sales": float(item['total_sales'] or 0)
        }
        for item in sales_trend
    ]

    return Response({
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "total_paid_orders": total_paid_orders,
        "total_refunded_amount": total_refunded_amount,
        "orders_by_status": status_counts,
        "payments_summary": {
            "total_payments": payments.count(),
            "successful": payment_counts.get('success', 0),
            "failed": payment_counts.get('failed', 0),
            "pending": payment_counts.get('pending', 0),
            "refunded": payment_counts.get('refunded', 0),
            "total_amount": payment_amount,
        },
        "sales_trend": sales_trend_data,  # این بخش اضافه شده
    })

@api_view(['GET'])
def top_products_report(request):
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')
    limit = int(request.query_params.get('limit', 10))

    order_items = OrderItem.objects.select_related('variant', 'variant__product').all()

    if start_date:
        order_items = order_items.filter(order__created_at__date__gte=parse_date(start_date))
    if end_date:
        order_items = order_items.filter(order__created_at__date__lte=parse_date(end_date))

    top_products = (
        order_items.values(
            'variant__id',
            'variant__sku',
            'variant__product__id',
            'variant__product__name',
        )
        .annotate(
            total_quantity_sold=Sum('quantity'),
            total_revenue=Sum('total_price')
        )
        .order_by('-total_quantity_sold')[:limit]
    )

    result = []
    for prod in top_products:
        result.append({
            "product_id": prod['variant__product__id'],
            "product_name": prod['variant__product__name'],
            "variant_sku": prod['variant__sku'],
            "total_quantity_sold": prod['total_quantity_sold'],
            "total_revenue": prod['total_revenue'],
        })

    return Response(result)


@api_view(['GET'])
def low_stock_products_report(request):
    limit = int(request.query_params.get('limit', 10))

    low_stock_variants = ProductVariant.objects.filter(
        stock__lte=F('low_stock_threshold')
    ).select_related('product').order_by('stock')[:limit]

    result = []
    for variant in low_stock_variants:
        result.append({
            "variant_id": variant.id,
            "product_name": variant.product.name,
            "variant_sku": variant.sku,
            "stock": variant.stock,
            "low_stock_threshold": variant.low_stock_threshold,
        })

    return Response(result)
