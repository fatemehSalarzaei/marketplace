from rest_framework.routers import DefaultRouter
from django.urls import path, include
from PageBuilder.Views import *

router = DefaultRouter()
router.register(r'admin/elementtypes', ElementTypeViewSet, basename='elementtype')
router.register(r'elements', ElementViewSet, basename='element')
router.register(r'elementitems', ElementItemViewSet, basename='elementitem')

urlpatterns = [
    path('', include(router.urls)),
    path('user-facing/elements/', UserFacingElementListAPIView.as_view(), name='user-facing-element-list'),
    path('element/update-positions/', update_positions, name='update_positions'),

]
