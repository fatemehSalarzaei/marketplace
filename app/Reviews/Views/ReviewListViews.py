from rest_framework import generics
from Reviews.models import Review
from Reviews.Serializers import ReviewListSerializer

class ReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewListSerializer

    def get_queryset(self):
        queryset = Review.objects.filter(
            status=Review.STATUS_APPROVED,
            parent__isnull=True
        ).select_related('user', 'product').order_by('-created_at')

        product_id = self.request.query_params.get('product')
        if product_id:
            queryset = queryset.filter(product_id=product_id)

        return queryset
