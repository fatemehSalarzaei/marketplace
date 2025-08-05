from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from Accounts.Serializers import UserAvatarSerializer
from Accounts.models import User

class UserAvatarUpdateView(generics.UpdateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = UserAvatarSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.avatar.delete(save=True)  # حذف فایل از سیستم و دیتابیس
        user.avatar = None
        user.save()
        return Response({"detail": "Avatar deleted successfully."}, status=status.HTTP_204_NO_CONTENT)