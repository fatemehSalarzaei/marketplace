# shipping/views.py

from rest_framework import viewsets, permissions
from Shipping.models import ShippingCost, ShippingMethod

from Shipping.Serializers.ShippingCostSerializers import (
    ShippingCostSerializer,
)

# --- Custom Permission Class (Optional but Recommended for Admin APIs) ---
class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow read-only access for anyone,
    but full write/edit access only to staff/admin users.
    """
    def has_permission(self, request, view):
        # Allow GET, HEAD, OPTIONS requests for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Allow write access only for staff users (admins)
        return request.user and request.user.is_staff

# --- ViewSets for related models (if you need APIs for them) ---


class ShippingCostViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing ShippingCost rules.
    Allows staff/admin users to create, retrieve, update, and delete shipping cost rules.
    Non-staff users can only read the rules.
    """
    # Order by priority (lower number = higher priority), then by most recently created
    queryset = ShippingCost.objects.all().order_by('priority', '-created_at')
    serializer_class = ShippingCostSerializer
    permission_classes = [IsAdminOrReadOnly] # Apply the custom permission
