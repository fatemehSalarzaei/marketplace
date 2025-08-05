# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Accounts.Serializers import MyRolePermissionSerializer
from Accounts.models import RoleModelPermission

class MyRoleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role

        if not role:
            return Response({
                "detail": "این کاربر نقشی ندارد."
            }, status=404)

        permissions = RoleModelPermission.objects.filter(
            role=role,
        ).filter(
            models.Q(can_create=True) |
            models.Q(can_read=True) |
            models.Q(can_update=True) |
            models.Q(can_delete=True)
        )

        serializer = MyRolePermissionSerializer(permissions, many=True)

        return Response({
            "role": {
                "id": role.id,
                "name": role.name,
                "description": role.description
            },
            "permissions": serializer.data
        })
