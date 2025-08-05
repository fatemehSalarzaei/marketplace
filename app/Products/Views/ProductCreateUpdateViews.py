from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse
from Products.models import Product
from Products.Serializers import ProductSerializer


class ProductCreateUpdateAPIView(APIView):
    @extend_schema(
        request=ProductSerializer,
        responses={
            200: OpenApiResponse(response=ProductSerializer, description='به‌روزرسانی موفق'),
            201: OpenApiResponse(response=ProductSerializer, description='ایجاد موفق'),
            400: OpenApiResponse(description='داده‌های نامعتبر'),
            404: OpenApiResponse(description='محصول پیدا نشد'),
        },
        examples=[
            OpenApiExample(
                name="نمونه ایجاد محصول",
                value={
                    "name": "کفش ورزشی مردانه",
                    "product_code": "SHOE123",
                    "slug": "men-sport-shoe",
                    "status": "published",
                    "short_description": "<p>توضیح کوتاه</p>",
                    "long_description": "<p>توضیح کامل محصول با ویژگی‌ها</p>",
                    "availability_status": "in_stock",
                    "min_order_quantity": 1,
                    "max_order_quantity": 5,
                    "brand": 3,
                    "category": 2,
                    "is_active": True
                },
                request_only=True
            ),
            OpenApiExample(
                name="نمونه پاسخ موفق",
                value={
                    "id": 12,
                    "name": "کفش ورزشی مردانه",
                    "product_code": "SHOE123",
                    "slug": "men-sport-shoe",
                    "status": "published",
                    "short_description": "<p>توضیح کوتاه</p>",
                    "long_description": "<p>توضیح کامل محصول با ویژگی‌ها</p>",
                    "availability_status": "in_stock",
                    "min_order_quantity": 1,
                    "max_order_quantity": 5,
                    "brand": 3,
                    "category": 2,
                    "is_active": True
                },
                response_only=True
            ),
        ],
        description="ایجاد یا ویرایش محصول بر اساس وجود شناسه `id`. اگر شناسه ارسال نشود، محصول جدید ساخته می‌شود.",
        tags=["Products"]
    )
    def post(self, request, *args, **kwargs):
        pk = request.data.get('id') or request.data.get('pk')
        if pk:
            try:
                product = Product.objects.get(pk=pk)
            except Product.DoesNotExist:
                return Response({'error': 'محصول پیدا نشد'}, status=status.HTTP_404_NOT_FOUND)
            serializer = ProductSerializer(product, data=request.data, context={'request': request})
        else:
            serializer = ProductSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK if pk else status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
