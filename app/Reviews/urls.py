from django.urls import path , include
from rest_framework.routers import DefaultRouter
from Reviews.Views import *

router = DefaultRouter()
router.register(r'admin/reviews', AdminReviewViewSet, basename='admin-reviews')

urlpatterns = [
    path('', include(router.urls)),

    path('reviews/create/', ReviewCreateAPIView.as_view(), name='review-create'),    
    path('user/order-item-review/', OrderItemReviewCreateAPIView.as_view(), name='user-order-item-review-create'),
    path('admin/order-item-reviews/', AdminOrderItemReviewListAPIView.as_view(), name='admin-order-item-review-list'),
    path('reviews/', ReviewListAPIView.as_view(), name='review-list'),

]
