
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Notifications.Views import *

router = DefaultRouter()
router.register(r'admin/notifications', AdminNotificationViewSet) 

urlpatterns = [
    path('', include(router.urls)), 
    path('user/notifications/', UserNotificationListView.as_view(), name='user-notification-list'),
    path('user/notifications/<int:pk>/', UserNotificationDetailView.as_view(), name='user-notification-detail'),
    # path('user/notifications/<int:pk>/mark-as-read/', UserNotificationDetailView.as_view({'patch': 'mark_as_read'}), name='user-notification-mark-read'),
    # path('user/notifications/mark-all-as-read/', UserNotificationDetailView.as_view({'post': 'mark_all_as_read'}), name='user-notification-mark-all-read'),

]
