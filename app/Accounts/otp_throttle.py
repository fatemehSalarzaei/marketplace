from rest_framework.throttling import SimpleRateThrottle
from rest_framework.exceptions import Throttled

from Accounts.exceptions import CustomThrottleException


# class OTPThrottle(SimpleRateThrottle):
#     # scope = 'otp'

#     def get_cache_key(self, request, view):
#         return self.get_ident(request)  
#     # def throttle_failure(self):
#     #     raise CustomThrottleException()


# class RegisterThrottle(SimpleRateThrottle):
#     # scope = 'register'

#     def get_cache_key(self, request, view):
#         return self.get_ident(request)

#     # def throttle_failure(self):
#     #     raise CustomThrottleException()