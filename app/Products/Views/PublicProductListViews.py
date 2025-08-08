from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny
from django.db.models import Min, Max, Count, Sum

from Products.models import Product
from Products.Serializers import PublicProductListSerializer
from .ProductFilter import ProductFilter


class PublicProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PublicProductListSerializer

    queryset = (
        Product.objects.filter(status='published')
        .select_related('category', 'brand', 'main_image')
        .prefetch_related(
            'tags',
            'gallery_images__image_asset',
            'videos__video_asset',
            'variants',
            'variants__variant_attributes',
            'variants__variant_attributes__attribute',
            'variants__variant_attributes__predefined_value',
            # 'variants__variant_attributes__value',
        )
        .annotate(
            min_price=Min('variants__price'),
            max_price=Max('variants__price'),
            total_sales=Sum('variants__order_items__quantity'),
            popularity=Count('variants__order_items'),
        )
    )

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter

    search_fields = ['name', 'short_description', 'long_description']
    ordering_fields = [
        'created_at', 'name', 'min_price', 'max_price', 'popularity', 'total_sales'
    ]
    ordering = ['-created_at']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
