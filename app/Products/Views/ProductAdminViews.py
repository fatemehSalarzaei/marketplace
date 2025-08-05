from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from rest_framework import status
from slugify import slugify
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from Products.models import Product
from Products.Serializers import ProductAdminSerializer

from .ProductFilter import ProductFilter

from app .permissions import HasModelPermission 

class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductAdminSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser, HasModelPermission]


    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'product_code', 'short_description', 'long_description']
    ordering_fields = ['created_at', 'updated_at', 'name']


    @action(detail=True, methods=['patch'], url_path='change-status')
    def change_status(self, request, pk=None):
        product = self.get_object()
        new_status = request.data.get('status')
        if new_status not in dict(Product.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        product.status = new_status
        product.save()
        return Response({'status': 'Status updated successfully'})
    
    @action(detail=True, methods=['patch'], url_path='change-availability')
    def change_availability(self, request, pk=None):
        product = self.get_object()
        new_availability = request.data.get('availability_status')
        if new_availability not in dict(Product.AVAILABILITY_CHOICES):
            return Response({'error': 'Invalid availability status'}, status=status.HTTP_400_BAD_REQUEST)
        product.availability_status = new_availability
        product.save()
        return Response({'status': 'Availability status updated successfully'})
    

    @action(detail=False, methods=['post'], url_path='create-default')
    def create_default_product(self, request):
        from django.utils.crypto import get_random_string

        default_name = "محصول جدید"
        random_code = f"PROD-{get_random_string(6).upper()}"
        slug = slugify(default_name + '-' + get_random_string(4))

        product = Product.objects.create(
            product_code=random_code,
            name=default_name,
            slug=slug,
        )

        serializer = self.get_serializer(product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
