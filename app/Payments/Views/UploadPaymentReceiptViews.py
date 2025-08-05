from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from Payments.models import Payment
from Payments.Serializers import PaymentReceiptUploadSerializer

class UploadPaymentReceiptAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            payment = Payment.objects.get(pk=pk, user=request.user)
        except Payment.DoesNotExist:
            return Response({"detail": "پرداخت موردنظر یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PaymentReceiptUploadSerializer(instance=payment, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(is_manual_review_required=True)
            return Response({"detail": "رسید با موفقیت بارگذاری شد."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
