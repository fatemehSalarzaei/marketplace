from rest_framework import generics, permissions, status
from rest_framework.response import Response
from Reviews.models import Review
from Reviews.Serializers import ReviewCreateSerializer

class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        product = serializer.validated_data.get('product')

        # بررسی وجود نظر قبلی
        existing_review = Review.objects.filter(
            user=user,
            product=product,
            parent__isnull=True  # فقط نظر اصلی، نه پاسخ
        ).first()

        if existing_review:
            # به‌روزرسانی نظر قبلی
            existing_review.rating = serializer.validated_data.get('rating', existing_review.rating)
            existing_review.comment = serializer.validated_data.get('comment', existing_review.comment)
            existing_review.save()
            self.updated_instance = existing_review  # ذخیره برای Response سفارشی
        else:
            # ایجاد نظر جدید
            serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        if hasattr(self, 'updated_instance'):
            return Response(
                {"detail": "نظر قبلی شما به‌روزرسانی شد."},
                status=status.HTTP_200_OK
            )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
