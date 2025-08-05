# support/views.py
from rest_framework import filters
from rest_framework import viewsets, permissions

from rest_framework.permissions import IsAdminUser

from Support.models import Ticket
from Support.Serializers import AdminTicketSerializer

from app .permissions import HasModelPermission 

class AdminTicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = AdminTicketSerializer
    permission_classes = [IsAdminUser , HasModelPermission]  # فقط ادمین دسترسی دارد
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['subject', 'phone_number', 'order_number', 'description']
    ordering_fields = ['created_at', 'priority', 'status']
