# dashboard/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import models

from Orders.models import Order
from Products.models import Product
from Accounts.Serializers import FavoriteProductSerializer, FrequentPurchaseSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user

    # 1) اطلاعات کاربر
    profile_data = {
        "fullName": f"{user.first_name} {user.last_name}".strip(),
        "phone": getattr(user, "phone_number", ""),  # فرض می‌کنیم phone_number در مدل کاربر وجود دارد
    }

    # 2) خلاصه سفارش‌ها
    orders_summary = {
        "processing": Order.objects.filter(user=user, status="processing").count(),
        "delivered": Order.objects.filter(user=user, status="delivered").count(),
        "returned": Order.objects.filter(user=user, has_return_request=True).count(),
    }

    # 3) لیست علاقه‌مندی‌ها
    favorites = user.favorites.select_related("product", "variant").all()
    favorite_data = FavoriteProductSerializer(favorites, many=True ,  context={"request": request}).data

    # 4) خریدهای پرتکرار
    frequent_products = (
            Order.objects.filter(user=user, status__in=["delivered", "processing"])
            .values(
                product_id=models.F("items__variant__product__id"),
                product_name=models.F("items__variant__product__name"),
            )
            .annotate(count=models.Sum("items__quantity"))
            .order_by("-count")[:10]
        )
    frequent_data = FrequentPurchaseSerializer(frequent_products, many=True).data

    return Response({
        "profile": profile_data,
        "ordersSummary": orders_summary,
        "favorites": favorite_data,
        "frequentPurchases": frequent_data
    })
