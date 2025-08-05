from rest_framework import viewsets, permissions
from Addresses.models import Address
from Addresses.Serializers import AddressSerializer

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        user = self.request.user
        is_default = instance.is_default
        instance.delete()

        if is_default:
            next_address = Address.objects.filter(user=user).first()
            if next_address:
                next_address.is_default = True
                next_address.save()