# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema , OpenApiResponse
from rest_framework.permissions import AllowAny

from Accounts import utils
from Accounts.models import PhoneCode, User
from Accounts.Serializers import SendCodeSerializer, VerifyCodeSerializer
# from Accounts.otp_throttle import OTPThrottle, RegisterThrottle
from Carts.utils import merge_guest_cart_to_user




class SendCodeView(APIView):
    # throttle_classes = [OTPThrottle]
    permission_classes = [AllowAny]

    @extend_schema(
        request=SendCodeSerializer,
        responses={200: OpenApiResponse(description="کد تأیید ارسال شد")},
    )
    def post(self, request):
        serializer = SendCodeSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data["phone_number"]
            phone_obj, created = PhoneCode.objects.get_or_create(phone_number=phone)
            
            if phone_obj.limitations_check():
                phone_obj.tmp_code = utils.password_generator()
                phone_obj.tmp_code_expire = timezone.now() + timezone.timedelta(minutes=5)
                phone_obj.tmp_code_sent_time = timezone.now()
                phone_obj.save()

                print(f"Send SMS code to {phone}: {phone_obj.tmp_code}")

                return Response({"detail": "کد تأیید ارسال شد." , "code" : phone_obj.tmp_code } , status=status.HTTP_200_OK)
            else:
                return Response({"detail": "محدودیت ارسال پیامک فعال است."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyCodeView(APIView):
    # throttle_classes = [RegisterThrottle]
    permission_classes = [AllowAny]

    @extend_schema(
        request=VerifyCodeSerializer,
        responses={
            200: OpenApiResponse(
                response=None,
                description="بازگشت توکن و اطلاعات کاربر"
            )
        },
    )
    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data["phone_number"]

            user, created = User.objects.get_or_create(phone_number=phone)

            refresh = RefreshToken.for_user(user)

            session_id = request.session.session_key
            merge_guest_cart_to_user(session_id, user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "uuid": user.id,
                "full_name" : user.full_name , 
                "phone_number" : user.phone_number
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)