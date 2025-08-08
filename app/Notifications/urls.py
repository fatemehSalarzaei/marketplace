
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Notifications.Views import *

router = DefaultRouter()
router.register(r'admin/notifications', AdminNotificationViewSet) 
router.register(r'user/notifications', UserNotificationViewSet, basename='user-notifications')

urlpatterns = [
    path('', include(router.urls)), 
    
]
