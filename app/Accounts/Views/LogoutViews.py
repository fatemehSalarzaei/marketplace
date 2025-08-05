from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from drf_spectacular.utils import extend_schema , OpenApiResponse

from Accounts.Serializers import LogoutSerializer

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @extend_schema(
        request=LogoutSerializer,
        responses={200: OpenApiResponse(description="با موفقیت خارج شدید")},
    )
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "با موفقیت خارج شدید"}, status=status.HTTP_205_RESET_CONTENT)
