# accounts/views.py یا reports/views.py
from auditlog.models import LogEntry
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from Accounts.Serializers import LogEntrySerializer

from app .permissions import HasModelPermission 


class AdminLogEntryListView(generics.ListAPIView):
    queryset = LogEntry.objects.all().select_related("actor", "content_type")
    serializer_class = LogEntrySerializer
    permission_classes = [permissions.IsAdminUser , HasModelPermission]  # فقط ادمین‌ها
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["actor", "action", "content_type"]
    search_fields = ["object_repr", "changes"]
    ordering_fields = ["timestamp"]
    ordering = ["-timestamp"]
