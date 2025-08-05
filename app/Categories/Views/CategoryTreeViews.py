from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from Categories.models import Category
from Categories.Serializers import CategoryTreeSerializer


class CategoryTreeAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        queryset = Category.objects.filter(parent__isnull=True, is_active=True, is_deleted=False)
        serializer = CategoryTreeSerializer(queryset, many=True)
        return Response(serializer.data)
