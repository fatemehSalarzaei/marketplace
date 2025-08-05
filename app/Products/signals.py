from django.db.models.signals import pre_save , post_save, post_delete
from django.dispatch import receiver
from Products.models import ProductVariant
from Carts.models import CartItem


@receiver(pre_save, sender=ProductVariant)
def update_cart_items_on_price_change(sender, instance, **kwargs):
    try:
        old_instance = ProductVariant.objects.get(pk=instance.pk)
    except ProductVariant.DoesNotExist:
        return  # یعنی محصول جدید ایجاد شده نه ویرایش، پس کاری نکن

    # فقط اگر قیمت تغییر کرده باشد
    if old_instance.price != instance.price:
        cart_items = CartItem.objects.filter(product_variant=instance)

        for item in cart_items:
            item.price_at_time = instance.price
            item.save()


@receiver(post_save, sender=ProductVariant)
def remove_cart_items_if_unavailable(sender, instance, **kwargs):
    # وقتی موجودی صفر یا غیرفعال باشد
    if instance.stock == 0 or not instance.is_active:
        # حذف آیتم‌های سبد مرتبط
        cart_items = CartItem.objects.filter(product_variant=instance)
        for item in cart_items:
            cart = item.cart
            item.delete()
            cart.update_total_price()

@receiver(post_delete, sender=ProductVariant)
def remove_cart_items_on_product_variant_delete(sender, instance, **kwargs):
    # وقتی محصول حذف شود، آیتم‌های سبد مرتبط را حذف کن
    cart_items = CartItem.objects.filter(product_variant=instance)
    for item in cart_items:
        cart = item.cart
        item.delete()
        cart.update_total_price()

