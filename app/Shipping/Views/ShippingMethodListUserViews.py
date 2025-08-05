from rest_framework import generics
from Shipping.models import ShippingMethod
from Shipping.Serializers import ShippingMethodSerializer

class ShippingMethodListUserAPIView(generics.ListAPIView):
    serializer_class = ShippingMethodSerializer

    def get_queryset(self):
        return ShippingMethod.objects.filter(active=True)
