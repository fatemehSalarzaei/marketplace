from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from Payments.models import Payment
from Payments.Serializers import PaymentSerializer

@api_view(['GET'])
def payment_list(request):
    page = int(request.query_params.get('page', 1))
    page_size = int(request.query_params.get('page_size', 10))
    status_filter = request.query_params.get('status')
    search = request.query_params.get('search')

    payments = Payment.objects.select_related('invoice__order', 'user', 'payment_gateway').all()

    if status_filter:
        payments = payments.filter(status=status_filter)

    if search:
        payments = payments.filter(
            Q(invoice__order__order_number__icontains=search) |
            Q(user__first_name__icontains=search) |
            Q(user__last_name__icontains=search)
        )

    total_count = payments.count()
    start = (page - 1) * page_size
    end = start + page_size
    payments = payments.order_by('-payment_date')[start:end]

    serializer = PaymentSerializer(payments, many=True)
    return Response({
        'count': total_count,
        'results': serializer.data
    })
