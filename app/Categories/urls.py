from rest_framework import routers
from django.urls import path, include
from Categories.Views import *

router = routers.DefaultRouter()
router.register(r'admin/categories', AdminCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('categories/tree/', CategoryTreeAPIView.as_view(), name='category-tree'),
    path('categories/ancestors/<slug:slug>/', CategoryAncestorsAPIView.as_view(), name='category-ancestors'),
    path('categories/<slug:category_slug>/filters/', CategoryFilterAPIView.as_view(), name='category-filters'),
    path('admin/categories-all/', CategoryListNoPagination.as_view(), name='categories-no-pagination'),

]
