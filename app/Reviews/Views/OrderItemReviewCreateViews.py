# views.py
from rest_framework import generics, permissions
from drf_spectacular.utils import extend_schema, OpenApiResponse
from Reviews.models import OrderItemReview
from Reviews.Serializers import OrderItemReviewCreateSerializer

class OrderItemReviewCreateAPIView(generics.CreateAPIView):
    serializer_class = OrderItemReviewCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        responses={201: OpenApiResponse(description="نظر با موفقیت ثبت شد")}
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
