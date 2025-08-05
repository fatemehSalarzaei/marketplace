# categories/api_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from Categories.models import Category
from Categories.Serializers import CategorySerializer  # مسیر صحیح به Serializer را تنظیم کنید

class CategoryListNoPagination(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
