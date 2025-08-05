from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Sociallinks.Views import*

router = DefaultRouter()
router.register(r'admin/social-links', AdminSocialLinkViewSet, basename='admin-social-link')

urlpatterns = [
    path('', include(router.urls)),
]
