from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from Shipping.models import ShippingMethod
from Shipping.Serializers import ShippingMethodSerializer
from app.permissions import HasModelPermission

class ShippingMethodAdminViewSet(viewsets.ModelViewSet):
    queryset = ShippingMethod.objects.all()
    serializer_class = ShippingMethodSerializer
    permission_classes = [HasModelPermission]

    # اضافه کردن فیلتر و جستجو
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['active']  # فیلتر بر اساس وضعیت فعال بودن
    search_fields = ['name', 'description']  # جستجو بر اساس نام و توضیحات

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False  # حذف در واقع غیرفعال کردن است
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
