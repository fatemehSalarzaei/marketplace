from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from Orders.Serializers import ReturnRequestSerializer

class CreateReturnRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ReturnRequestSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                serializer.save(user=request.user)
            except IntegrityError:
                return Response(
                    {"non_field_errors": ["درخواست بازگشت برای این آیتم سفارش قبلا ثبت شده است."]},
                    status=status.HTTP_400_BAD_REQUEST
                )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
