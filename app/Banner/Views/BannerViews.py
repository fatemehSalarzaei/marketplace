from rest_framework import mixins, viewsets
from django.db import models

from Banner.models import Banner
from Banner.Serializers import BannerSerializer
from django.utils import timezone
from rest_framework.permissions import AllowAny

class BannerViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = BannerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        now = timezone.now()
        return Banner.objects.filter(
            is_active=True,
        ).filter(
            models.Q(start_at__lte=now) | models.Q(start_at__isnull=True),
            models.Q(end_at__gte=now) | models.Q(end_at__isnull=True)
        ).order_by('position')
