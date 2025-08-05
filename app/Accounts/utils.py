from random import randint

from django.utils import timezone


def password_generator():
    """
        generate integer password with 6 digits 
        - return : integer
    """
    return randint(100000, 999999)


def five_minute_later():
    """
        returning the date time (five minute later) for OPT code expire time that sended to user
        - return : date time
    """
    return timezone.now() + timezone.timedelta(minutes=5)


def five_minute_ago():
    """
        returnin the date time (five minute ago) for saving the default value for OPT code sent time
        - return : date time
    """
    return timezone.now() - timezone.timedelta(minutes=5)



def log_user_activity(request, action):
    from .models import UserActivityLog

    ip = get_client_ip(request)
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    user = request.user if request.user.is_authenticated else None

    UserActivityLog.objects.create(
        user=user,
        action=action,
        ip_address=ip,
        user_agent=user_agent
    )

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0]
    return request.META.get('REMOTE_ADDR')
