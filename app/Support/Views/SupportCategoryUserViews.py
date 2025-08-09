from rest_framework import generics
from Support.models import SupportCategory
from Support.Serializers import SupportCategorySerializer

class SupportCategoryListAPIView(generics.ListAPIView):
    queryset = SupportCategory.objects.all()
    serializer_class = SupportCategorySerializer
    pagination_class = None  # غیرفعال کردن صفحه بندی
