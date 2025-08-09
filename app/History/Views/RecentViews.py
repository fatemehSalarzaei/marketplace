# recent_views/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.utils.timezone import now
from History.models import RecentView
from Products.models import Product
from History.Serializers import RecentViewSerializer

class RecentViewListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecentViewSerializer
    pagination_class = None  # غیرفعال کردن صفحه‌بندی

    def get_queryset(self):
        return (
            RecentView.objects
            .filter(user=self.request.user)
            .order_by('-viewed_at')[:10]  # فقط 10 آیتم آخر
        )

    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # اگر قبلاً وجود داشته، فقط زمان رو آپدیت کن
        recent_view, created = RecentView.objects.get_or_create(
            user=request.user,
            product=product
        )
        recent_view.viewed_at = now()
        recent_view.save()

        serializer = self.get_serializer(recent_view)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
