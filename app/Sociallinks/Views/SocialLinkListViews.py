from rest_framework import generics
from drf_spectacular.utils import extend_schema, OpenApiResponse

from Sociallinks.models import SocialLink
from Sociallinks.Serializers import SocialLinkPublicSerializer


@extend_schema(
    tags=["لینک‌های شبکه اجتماعی"],
    responses={200: OpenApiResponse(description="لیست لینک‌های فعال")}
)
class SocialLinkListView(generics.ListAPIView):
    queryset = SocialLink.objects.filter(is_active=True).order_by('order')
    serializer_class = SocialLinkPublicSerializer
    permission_classes = []  # دسترسی عمومی
