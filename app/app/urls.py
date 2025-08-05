"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from PageBuilder.Views import UserFacingElementListAPIView


api_urlpatterns = [
    path('admin/', admin.site.urls),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # urls app
    path('accounts/', include('Accounts.urls')),
    path('addresses/', include('Addresses.urls')),
    path('analytics/', include('Analytics.urls')),
    path('attributes/', include('Attributes.urls')),
    path('brands/', include('Brands.urls')),
    path('carts/', include('Carts.urls')),
    path('categories/', include('Categories.urls')),
    path('discounts/', include('Discounts.urls')),
    path('favorites/', include('Favorites.urls')),
    path('history/', include('History.urls')),
    path('notifications/', include('Notifications.urls')),
    path('orders/', include('Orders.urls')),
    path('payments/', include('Payments.urls')),
    path('products/', include('Products.urls')),
    path('reviews/', include('Reviews.urls')),
    path('shipping/', include('Shipping.urls')),
    path('tags/', include('Tags.urls')),
    path('media/', include('MediaApp.urls')),
    path('page-builder/', include('PageBuilder.urls')),
    path('banner/', include('Banner.urls')),
    path('support/', include('Support.urls')),

    path('home/', UserFacingElementListAPIView.as_view(), name='user-facing-element-list'),


]
urlpatterns = [
    path('api/v1/', include(api_urlpatterns)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
