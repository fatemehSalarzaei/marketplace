# support/views.py
from rest_framework import generics, viewsets, permissions
from Support.models import Ticket
from Support.Serializers import PublicTicketSerializer, UserTicketSerializer

# ایجاد تیکت توسط کاربران غیر لاگین (بر اساس شماره تماس)
class PublicTicketCreateAPIView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = PublicTicketSerializer
    permission_classes = []  # عمومی

# دریافت تیکت‌های کاربر لاگین کرده
class UserTicketViewSet(viewsets.ModelViewSet):
    serializer_class = UserTicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Ticket.objects.filter(user=self.request.user).select_related('category').prefetch_related('messages')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)