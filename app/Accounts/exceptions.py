from rest_framework.exceptions import Throttled

class CustomThrottleException(Throttled):
    default_detail = 'شما بیش از حد مجاز درخواست ارسال کردید. لطفاً کمی بعد تلاش کنید.'
