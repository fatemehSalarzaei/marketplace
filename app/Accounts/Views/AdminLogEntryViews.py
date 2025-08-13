# accounts/views.py یا reports/views.py
from auditlog.models import LogEntry
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateTimeFromToRangeFilter, CharFilter
from Accounts.Serializers import LogEntrySerializer

from django.db.models import Q

class LogEntryFilter(FilterSet):
    search = CharFilter(method='filter_search', label="Search")
    timestamp = DateTimeFromToRangeFilter()

    class Meta:
        model = LogEntry
        fields = ['action', 'content_type', 'timestamp']

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(actor__first_name__icontains=value) |
            Q(actor__last_name__icontains=value) |
            Q(actor__phone_number__icontains=value)
        )

class AdminLogEntryListView(generics.ListAPIView):
    queryset = LogEntry.objects.filter(actor__isnull=False).select_related("actor", "content_type")
    serializer_class = LogEntrySerializer
    permission_classes = []  # فقط ادمین‌ها
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = LogEntryFilter
    search_fields = ["object_repr", "changes"]
    ordering_fields = ["timestamp"]
    ordering = ["-timestamp"]
