# support/views.py

from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from Support.models import TicketMessage, Ticket
from Support.Serializers import TicketMessageSerializer

class IsTicketOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # فقط صاحب تیکت اجازه دسترسی دارد
        return obj.ticket.user == request.user

class UserTicketMessageViewSet(viewsets.ModelViewSet):
    serializer_class = TicketMessageSerializer
    permission_classes = [permissions.IsAuthenticated, IsTicketOwner]

    def get_queryset(self):
        # پیام‌های تیکت‌های خود کاربر را نمایش بده
        return TicketMessage.objects.filter(ticket__user=self.request.user).order_by('created_at')

    def perform_create(self, serializer):
        ticket = serializer.validated_data['ticket']
        # اطمینان از اینکه کاربر فقط برای تیکت خودش پیام می‌فرستد
        if ticket.user != self.request.user:
            raise PermissionDenied("شما اجازه ارسال پیام به این تیکت را ندارید.")
        serializer.save(sender=self.request.user)
