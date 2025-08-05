import os
import django
from django.db import connection

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
django.setup()

with connection.cursor() as cursor:
    cursor.execute("DELETE FROM Carts_cartitem;")
    cursor.execute("DELETE FROM Carts_cart;")

print("✅ همه رکوردهای جدول‌های CartItem و Cart حذف شدند.")
