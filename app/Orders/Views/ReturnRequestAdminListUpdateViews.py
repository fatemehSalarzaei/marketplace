from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from Orders.models import ReturnRequest
from Orders.Serializers import ReturnRequestAdminSerializer

from app .permissions import HasModelPermission 

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class ReturnRequestAdminListUpdateAPIView(generics.ListAPIView):
    queryset = ReturnRequest.objects.all().order_by('-requested_at')
    serializer_class = ReturnRequestAdminSerializer
    permission_classes = [IsAdminUser,HasModelPermission]

    def patch(self, request, *args, **kwargs):
        try:
            return_request = ReturnRequest.objects.get(id=request.data.get('id'))
        except ReturnRequest.DoesNotExist:
            return Response({'detail': 'درخواست برگشتی یافت نشد.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(return_request, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(processed_at=timezone.now())
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
