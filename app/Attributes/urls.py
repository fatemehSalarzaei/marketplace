# urls/admin/attribute_urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Attributes.Views import *

router = DefaultRouter()
router.register(r'admin/attributes', AdminAttributeViewSet, basename='admin-attribute')
# router.register(r'admin/attributes-all', AdminAttributeViewSet, basename='admin-attribute-all')
router.register(r'admin/attribute-groups', AttributeGroupViewSet, basename='attribute-group')
router.register('admin/attribute-values', AttributeValueAdminViewSet, basename='attribute-value-admin')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/attributes-all/', AdminAttributeViewSet.as_view({'get': 'list'}), name='attributes-all-list'),

]
