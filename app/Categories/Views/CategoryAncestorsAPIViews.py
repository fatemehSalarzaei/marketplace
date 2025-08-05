# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from Categories.models import Category
from Categories.Serializers import CategoryAncestorSerializer

class CategoryAncestorsAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, slug):
        category = get_object_or_404(Category, slug=slug)
        serializer = CategoryAncestorSerializer(category)
        return Response(serializer.data)
