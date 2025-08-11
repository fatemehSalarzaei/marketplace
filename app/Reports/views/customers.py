from django.utils.dateparse import parse_date
from django.db.models import Count, Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Accounts.models import User, UserActivityLog
from Orders.models import Order

@api_view(['GET'])
def customers_report(request):
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')
    top_n = request.query_params.get('top_n', 10)

    try:
        top_n = int(top_n)
        if top_n <= 0:
            top_n = 10
    except ValueError:
        top_n = 10

    # فیلتر کاربران جدید
    users = User.objects.all()
    if start_date:
        users = users.filter(date_joined__date__gte=parse_date(start_date))
    if end_date:
        users = users.filter(date_joined__date__lte=parse_date(end_date))

    new_customers_count = users.count()

    # فیلتر لاگ‌های اکتیویتی برای مشتریان فعال
    logs = UserActivityLog.objects.all()
    if start_date:
        logs = logs.filter(created_at__date__gte=parse_date(start_date))
    if end_date:
        logs = logs.filter(created_at__date__lte=parse_date(end_date))

    active_customer_ids = logs.values_list('user_id', flat=True).distinct()
    active_customers_count = User.objects.filter(id__in=active_customer_ids).count()

    # مشتریان برتر بر اساس مجموع خرید
    orders = Order.objects.filter(is_paid=True)
    if start_date:
        orders = orders.filter(created_at__date__gte=parse_date(start_date))
    if end_date:
        orders = orders.filter(created_at__date__lte=parse_date(end_date))

    top_customers = (
        orders.values('user__id', 'user__first_name', 'user__last_name')
        .annotate(total_orders=Count('id'), total_spent=Sum('final_price'))
        .order_by('-total_spent')[:top_n]
    )

    top_customers_data = []
    for c in top_customers:
        full_name = f"{c['user__first_name']} {c['user__last_name']}".strip()
        top_customers_data.append({
            'user_id': c['user__id'],
            'name': full_name or 'ناشناخته',
            'orders': c['total_orders'],
            'total_spent': c['total_spent'],
        })

    return Response({
        "new_customers_count": new_customers_count,
        "active_customers_count": active_customers_count,
        "top_customers": top_customers_data,
    })
