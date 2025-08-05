from Carts.models import Cart  , CartItem

def get_guest_cart(session_id):
    try:
        return Cart.objects.get(session_id=session_id,user=None, is_active=True)
    except Cart.DoesNotExist:
        return None

def merge_guest_cart_to_user(session_id, user):
    guest_cart = get_guest_cart(session_id)
    if not guest_cart:
        return

    try:
        user_cart = Cart.objects.filter(user=user, is_active=True).first()
    except Cart.DoesNotExist:
        user_cart = None

    if user_cart:
        # ادغام آیتم‌ها: اگر محصول مشترک بود، تعداد جمع شود
        for item in guest_cart.items.all():
            user_item, created = CartItem.objects.get_or_create(
                cart=user_cart,
                product_variant=item.product_variant,
                defaults={'quantity': 0, 'price_at_time': item.price_at_time}
            )
            if not created:
                user_item.quantity += item.quantity
            else:
                user_item.price_at_time = item.price_at_time
            user_item.save()
        guest_cart.is_active = False
        guest_cart.save()
    else:
        # فقط مالکیت سبد مهمان به کاربر منتقل شود
        guest_cart.user = user
        guest_cart.session_id = None
        guest_cart.save()
