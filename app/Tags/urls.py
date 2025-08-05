from rest_framework.routers import DefaultRouter
from Tags.Views import TagAdminViewSet

router = DefaultRouter()
router.register(r'admin/tags', TagAdminViewSet, basename='admin-tags')

urlpatterns = [
]

urlpatterns += router.urls
