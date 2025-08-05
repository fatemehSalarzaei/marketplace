from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from Banner.models import Banner
from Banner.Serializers import BannerSerializer

from app .permissions import HasModelPermission 
from django_filters.rest_framework import DjangoFilterBackend




class AdminBannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all().order_by('position')
    serializer_class = BannerSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    # افزودن فیلترها
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'banner_type', 'url']  # فیلدهایی که امکان جستجو دارند
