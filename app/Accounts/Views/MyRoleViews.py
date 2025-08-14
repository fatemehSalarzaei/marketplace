# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Accounts.Serializers import MyRolePermissionSerializer
from Accounts.models import RoleModelPermission
from rest_framework import status
from django.db.models import Q

class MyRoleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role

        if not role:
            return Response({
                "role": None,
                "permissions": []
            }, status=status.HTTP_200_OK)  

        permissions = RoleModelPermission.objects.filter(
            role=role,
            ).filter(
                Q(can_create=True) |
                Q(can_read=True) |
                Q(can_update=True) |
                Q(can_delete=True)
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
