from rest_framework import generics, permissions
from Accounts.models import User
from Accounts.Serializers import UserProfileSerializer, UserAvatarSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
