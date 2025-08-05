from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Support.Views import *


router = DefaultRouter()
router.register(r'admin/categories', SupportCategoryAdminViewSet, basename='admin-category')
router.register(r'categories', SupportCategoryUserViewSet, basename='user-category')
router.register('my-tickets', UserTicketViewSet, basename='user-ticket')
router.register('ticket-messages', UserTicketMessageViewSet, basename='user-ticket-messages')
router.register(r'admin/ticket-messages', AdminTicketMessageViewSet, basename='admin-ticket-messages')
router.register('admin/tickets', AdminTicketViewSet, basename='admin-tickets')

urlpatterns = [
    path('', include(router.urls)),
    path('public/create/', PublicTicketCreateAPIView.as_view(), name='ticket-public-create'),

]
