# urls.py

from django.urls import path
from Accounts.Views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# ایجاد یک نمونه روتر
router = DefaultRouter()
router.register(r'admin/roles', RoleViewSet)
router.register(r'admin/admin-users', AdminUserViewSet, basename='admin-users')
router.register(r'admin/regular-users', RegularUserViewSet, basename='regular-users')
router.register(r'admin/user-activity-logs', UserActivityLogViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/my-role/', MyRoleAPIView.as_view(), name='my-role-info'),
    path("auth/send-code/", SendCodeView.as_view(), name="send-code"),
    path("auth/verify-code/", VerifyCodeView.as_view(), name="verify-code"),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/avatar/', UserAvatarUpdateView.as_view(), name='user-avatar-update'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path("admin/logs/", AdminLogEntryListView.as_view(), name="admin-logs"),    
    path('model-access-permissions/', ModelAccessPermissionListAPIView.as_view(), name='model-access-permission-list'),




]
