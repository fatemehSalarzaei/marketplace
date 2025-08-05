from rest_framework.permissions import BasePermission, SAFE_METHODS

class HasModelPermission(BasePermission):
    """
    بررسی مجوز کاربر بر اساس نقش و متد (GET/POST/PUT/DELETE) یا ادمین بودن
    """

    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False

        if not  user.is_staff:
            return False

        if user.is_superuser or user.is_staff:
            return True

        if not hasattr(user, 'role') or not user.role:
            return False

        method = request.method

        # تبدیل متد به کد مجوز موردنظر
        permission_map = {
            'GET': 'view',
            'POST': 'add',
            'PUT': 'change',
            'PATCH': 'change',
            'DELETE': 'delete',
        }

        action_code = permission_map.get(method)

        # دریافت مدل ویو (مثلاً 'product' یا 'order')
        model_code = getattr(view, 'model_code', None)
        if not model_code:
            return False

        # بررسی اینکه نقش کاربر، این مجوز را دارد یا نه
        return user.role.permissions.filter(
            code=f"{action_code}_{model_code}"
        ).exists()
