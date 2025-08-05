from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Products.Views import *
router = DefaultRouter()
router.register('admin/products', ProductAdminViewSet, basename='admin-products')
router.register(r'admin/product-gallery-images', ProductGalleryImageAdminViewSet, basename='admin-product-gallery-images')
router.register(r'admin/product-variants', AdminProductVariantViewSet, basename='admin-product-variant')
router.register(r'admin/product-attribute-values', AdminProductAttributeValueViewSet, basename='admin-product-attribute-value')
router.register(r'admin/product-variant-attributes', AdminProductVariantAttributeViewSet, basename='admin-product-variant-attribute')

urlpatterns = [
    path('', include(router.urls)),
    path('products/', PublicProductListView.as_view(), name='public-product-list'),
    # path('products/<slug:slug>/', PublicProductDetailView.as_view(), name='public-product-detail'),
    path('products/<int:pk>/', PublicProductDetailView.as_view(), name='public-product-detail'),
    path('admin/product/save-update/', ProductCreateUpdateAPIView.as_view(), name='product-create-update'),
    path('admin/stock-alerts/', StockAlertListAPIView.as_view(), name='admin-stock-alerts'),
    path('filters/<int:category_id>/', FilterListAPIView.as_view(), name='filter-list'),

]
