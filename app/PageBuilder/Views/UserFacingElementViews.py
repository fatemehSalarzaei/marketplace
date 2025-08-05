from rest_framework import generics
from PageBuilder.models import Element
from PageBuilder.Serializers import UserFacingElementSerializer
from rest_framework.permissions import AllowAny

class UserFacingElementListAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]  # ⬅️ دسترسی عمومی

    serializer_class = UserFacingElementSerializer
    pagination_class = None  # ⬅️ این خط صفحه‌بندی را غیرفعال می‌کند

    def get_queryset(self):
        return (
            Element.objects
            .filter(page__is_active=True, is_active=True)
            .prefetch_related('items__content_object')
            .select_related('element_type', 'page')
            .order_by('position')
        )
