from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from decimal import Decimal

from Addresses.models import Address
from Carts.models import CartItem , Cart
from Discounts.models import DiscountCode
from .models import Order, OrderItem, OrderStatusHistory
from Shipping.models import ShippingAddress, Shipment
from Shipping.models import ShippingMethod
from Products.models import ProductVariant


@transaction.atomic
def create_order_logic(user, validated_data):
    address_id = validated_data.get("address_id")
    shipping_method_id = validated_data.get("shipping_method_id")
    coupon_code = validated_data.get("coupon_code", None)
    delivery_time = validated_data.get('delivery_time', None)

    # دریافت سبد خرید فعال بر اساس کاربر
    try:
        cart = Cart.objects.get(user=user, is_active=True)
    except Cart.DoesNotExist:
        raise ValueError("سبد خرید فعالی برای شما یافت نشد.")

    cart_items = cart.items.all()
    if not cart_items.exists():
        raise ValueError("سبد خرید شما خالی است.")

    # دریافت آدرس
    try:
        address = Address.objects.get(id=address_id, user=user)
    except Address.DoesNotExist:
        raise ValueError("آدرس انتخاب‌شده معتبر نیست.")

    # دریافت روش ارسال
    try:
        shipping_method = ShippingMethod.objects.get(id=shipping_method_id)
    except ShippingMethod.DoesNotExist:
        raise ValueError("روش ارسال معتبر نیست.")

    # اعمال تخفیف (اختیاری)
    discount = None
    if coupon_code:
        try:
            discount = DiscountCode.objects.get(code=coupon_code, is_active=True)
        except DiscountCode.DoesNotExist:
            raise ValueError("کد تخفیف معتبر نیست.")

    total_price = sum(item.get_total_price() for item in cart_items)
    discount_amount = discount.calculate_discount(total_price) if discount else Decimal('0')
    final_price = total_price - discount_amount + shipping_method.cost

    # ساخت سفارش
    order = Order.objects.create(
        user=user,
        total_price=total_price,
        final_price=final_price,
        delivery_price=shipping_method.cost,
        coupon=discount if discount else None,
        status='pending',
    )

    # افزودن اقلام سبد خرید به سفارش
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            variant=item.product_variant,
            title_snapshot=item.product_variant.product.name,
            quantity=item.quantity,
            unit_price=item.price_at_time,
            total_price=item.get_total_price()
        )

    # ایجاد آدرس ارسال
    ShippingAddress.objects.create(
        order=order,
        first_name=address.first_name,
        last_name=address.last_name,
        city=address.city,
        street_address=address.street_address,
        postal_code=address.postal_code,
        phone_number=address.phone_number
    )

    # ایجاد اطلاعات حمل و نقل
    Shipment.objects.create(
        order=order,
        shipping_method=shipping_method,
        cost=shipping_method.cost,
        preferred_delivery_time= delivery_time 
    )

    # ذخیره تاریخچه وضعیت سفارش
    OrderStatusHistory.objects.create(
        order=order,
        status='pending'
    )

    # غیرفعال‌سازی سبد خرید
    cart.is_active = False
    cart.save()

    # حذف اقلام سبد خرید
    cart_items.delete()

    return order

