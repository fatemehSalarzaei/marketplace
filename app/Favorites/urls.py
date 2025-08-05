# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Favorites.Views import *

router = DefaultRouter()
router.register('favorites', FavoriteViewSet, basename='favorites')

urlpatterns = [
    path('', include(router.urls)),
    path('check/', FavoriteStatusAPIView.as_view(), name='favorite-check'),

]
