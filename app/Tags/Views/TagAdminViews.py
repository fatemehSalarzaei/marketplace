from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

from Tags.models import Tag
from Products.models import Product
from Tags.Serializers import TagSerializer


from app .permissions import HasModelPermission 

class TagAdminViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]

    # اکشن برای دریافت تمام تگ‌های یک محصول
    @action(detail=False, methods=['get'], url_path='product/(?P<product_id>[^/.]+)')
    def list_tags_for_product(self, request, product_id=None):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        tags = product.tags.all()
        serializer = self.get_serializer(tags, many=True)
        return Response(serializer.data)

    # اکشن برای افزودن تگ به محصول
    @action(detail=True, methods=['post'], url_path='add-to-product')
    def add_to_product(self, request, pk=None):
        tag = self.get_object()
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'product_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product.tags.add(tag)
        return Response({'status': f'Tag "{tag.name}" added to product "{product.name}"'})

    # اکشن برای حذف تگ از محصول
    @action(detail=True, methods=['post'], url_path='remove-from-product')
    def remove_from_product(self, request, pk=None):
        tag = self.get_object()
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'product_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product.tags.remove(tag)
        return Response({'status': f'Tag "{tag.name}" removed from product "{product.name}"'})
