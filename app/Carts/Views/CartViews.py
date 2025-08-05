# Carts/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.permissions import AllowAny

from Products.models import ProductVariant
from Carts.models import Cart, CartItem
from Carts.Serializers import CartSerializer, AddToCartSerializer


class CartView(APIView):
    permission_classes = [AllowAny]

    def get_cart(self, request):
        user = request.user if request.user.is_authenticated else None
        session_id = request.session.session_key or request.session.save()

        cart, created = Cart.objects.get_or_create(
            user=user if user else None,
            session_id=None if user else session_id,
            is_active=True
        )
        return cart

    def get(self, request):
        cart = self.get_cart(request)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

    @extend_schema(
        request=AddToCartSerializer,
        responses={
            200: OpenApiResponse(description="سبد خرید با موفقیت به‌روزرسانی شد"),
            400: OpenApiResponse(description="خطا در داده‌های ورودی یا موجودی محصول"),
        },
        description="افزودن محصول به سبد خرید، کاهش تعداد یا حذف آن در صورت رسیدن به صفر"
    )
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        variant_id = serializer.validated_data['variant_id']
        quantity_change = serializer.validated_data['quantity']

        cart = self.get_cart(request)
        product_variant = get_object_or_404(ProductVariant, id=variant_id)
        product = product_variant.product

        if not product_variant.is_active or product_variant.stock <= 0:
            return Response(
                {'error': 'این محصول در حال حاضر موجود نیست.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_variant=product_variant,
            defaults={'quantity': 0, 'price_at_time': product_variant.price}
        )

        # حذف محصول اگر مقدار دقیقا 0 ارسال شود
        if quantity_change == 0:
            cart_item.delete()
            return Response({'message': 'محصول از سبد خرید حذف شد'}, status=status.HTTP_200_OK)

        new_quantity = cart_item.quantity + quantity_change

        # حذف محصول اگر تعداد نهایی صفر یا کمتر شود
        if new_quantity <= 0:
            cart_item.delete()
            return Response({'message': 'محصول از سبد خرید حذف شد'}, status=status.HTTP_200_OK)

        if new_quantity < product.min_order_quantity:
            return Response(
                {'error': f'حداقل تعداد قابل سفارش برای این محصول {product.min_order_quantity} عدد است.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_quantity > product.max_order_quantity:
            return Response(
                {'error': f'حداکثر تعداد قابل سفارش برای این محصول {product.max_order_quantity} عدد است.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_quantity > product_variant.stock:
            return Response(
                {'error': f'موجودی انبار کافی نیست. حداکثر {product_variant.stock} عدد موجود است.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item.quantity = new_quantity
        cart_item.price_at_time = product_variant.price
        cart_item.save()

        return Response({'message': 'سبد خرید با موفقیت به‌روزرسانی شد'}, status=status.HTTP_200_OK)
