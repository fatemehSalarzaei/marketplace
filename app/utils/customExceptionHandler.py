from rest_framework.views import exception_handler
from rest_framework import serializers

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, serializers.ValidationError):
        if response is not None:
            print('# استخراج اولین پیام خطا به صورت رشته ساده')
            detail = ''
            if isinstance(response.data, dict):
                first_key = next(iter(response.data))
                first_msg = response.data[first_key]
                if isinstance(first_msg, list):
                    detail = first_msg[0]
                else:
                    detail = first_msg
            else:
                detail = response.data

            response.data = {'detail': detail}

    return response
