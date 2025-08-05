import os
import django

# تنظیم مسیر پروژه
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')  # ← نام پروژه‌تان را جایگزین کنید
django.setup()
from django.contrib.contenttypes.models import ContentType
from Accounts.models import ModelAccessPermission  # آدرس صحیح مدل خودتان را جایگزین کنید
def create_model_permissions():
    for ct in ContentType.objects.all():
        model_code = ct.model  # مثلا 'product'
        model_name = ct.model.capitalize()  # مثلا 'Product'

        exists = ModelAccessPermission.objects.filter(code=model_code).exists()

        if not exists:
            ModelAccessPermission.objects.create(
                code=model_code,
                name=model_name
            )
            print(f"✅ Added: {model_code}")
        else:
            print(f"❌ Exists: {model_code}")

# اجرا
create_model_permissions()
