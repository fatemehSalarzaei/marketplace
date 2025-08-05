import requests
import json
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from Shipping.models import Shipment # 'your_app' را با نام واقعی اپلیکیشن خود جایگزین کنید!
from django.conf import settings # برای دسترسی به تنظیمات جنگو

# --- پیکربندی ---
# مهم: کلید API پستکس خود را در فایل settings.py جنگو ذخیره کنید.
# به عنوان مثال: POSTEX_API_KEY = "YOUR_ACTUAL_POSTEX_API_KEY"

# نگاشت وضعیت‌های برگشتی از پستکس به وضعیت‌های مدل Shipment شما.
# شما باید این نگاشت را با توجه به پاسخ‌های واقعی API پستکس تنظیم کنید.
# این فقط یک مثال است و ممکن است نیاز به اصلاح داشته باشد.
POSTEX_STATUS_MAP = {
    "تحویل شده": "delivered",
    "در حال پردازش": "in_transit", # یا 'shipped' بسته به تفسیر شما
    "در حال ارسال": "in_transit",
    "در انتظار جمع آوری": "pending",
    "لغو شده": "cancelled",
    # وضعیت‌های دیگر را که از API پستکس دریافت می‌کنید، اضافه کنید
    "نامشخص": "in_transit", # وضعیت پیش‌فرض برای موارد ناشناخته
}
# --- پایان پیکربندی ---

class Command(BaseCommand):
    help = 'وضعیت مرسولات فعال را با استفاده از API پستکس پیگیری و به‌روزرسانی می‌کند.'

    def handle(self, *args, **options):
        # دریافت کلید API از تنظیمات جنگو
        postex_api_key = getattr(settings, 'POSTEX_API_KEY', None)

        if not postex_api_key or postex_api_key == "YOUR_ACTUAL_POSTEX_API_KEY":
            raise CommandError(
                "لطفاً 'POSTEX_API_KEY' را در فایل settings.py خود تنظیم کنید "
                "و آن را با کلید API واقعی پستکس جایگزین کنید."
            )

        self.stdout.write(self.style.SUCCESS('شروع task پیگیری مرسولات...'))

        # دریافت مرسولاتی که هنوز تحویل نشده‌اند یا لغو نشده‌اند.
        # فرض می‌کنیم 'order.id' در مدل Shipment شما به عنوان 'order-id' برای پستکس استفاده می‌شود.
        # اگر پستکس از `tracking_number` استفاده می‌کند، باید فراخوانی API را اصلاح کنید.
        active_shipments = Shipment.objects.exclude(
            status__in=['delivered', 'cancelled']
        ).filter(
            # اطمینان از وجود order و داشتن ID که بتواند به عنوان order-id استفاده شود
            order__isnull=False
        ).select_related('order') # برای دسترسی کارآمد به جزئیات سفارش

        if not active_shipments.exists():
            self.stdout.write(self.style.SUCCESS('هیچ مرسوله فعالی برای پیگیری وجود ندارد.'))
            return

        for shipment in active_shipments:
            postex_order_id = shipment.order.id # فرض بر این است که پستکس از ID سفارش استفاده می‌کند
            # یا اگر پستکس از فیلد `tracking_number` شما استفاده می‌کند:
            # postex_order_id = shipment.tracking_number
            # if not postex_order_id:
            #     self.stdout.write(self.style.WARNING(f"رد شدن مرسوله با ID {shipment.id}: شماره پیگیری (tracking_number) تنظیم نشده است."))
            #     continue

            if not postex_order_id:
                self.stdout.write(self.style.WARNING(
                    f"رد شدن مرسوله با ID {shipment.id}: شناسه سفارشی برای پیگیری پستکس در دسترس نیست."
                ))
                continue

            self.stdout.write(
                f"در حال پیگیری مرسوله {shipment.id} با شناسه سفارش پستکس: {postex_order_id}..."
            )

            # ساخت URL API
            # URL مشخص شده در توضیحات قبلی به این صورت است:
            # https://api.postex.ir/api/v1/tracking/by-order-id/{order-id}?order-id=12
            # که نشان می‌دهد order-id هم در مسیر (path) و هم به عنوان پارامتر کوئری وجود دارد.
            # ما فرمت دقیق URL را مطابق با توضیحات شما حفظ می‌کنیم.
            api_url = (
                f"https://api.postex.ir/api/v1/tracking/by-order-id/{postex_order_id}"
                f"?order-id={postex_order_id}"
            )

            headers = {
                "x-api-key": postex_api_key,
                "Content-Type": "application/json"
            }

            try:
                response = requests.get(api_url, headers=headers, timeout=10) # تعیین یک زمان‌بندی (timeout)
                response.raise_for_status() # در صورت وجود پاسخ‌های خطا (4xx یا 5xx)، استثنا ایجاد می‌کند.
                postex_data = response.json()

                if postex_data.get('isSuccess'):
                    # بر اساس خروجی که شما ارائه دادید، پاسخ شامل {'isSuccess': true, 'message': 'string'} است.
                    # احتمالاً رشته 'message' وضعیت واقعی را نشان می‌دهد.
                    # ممکن است نیاز باشد این 'message' را با دقت بیشتری پردازش کنید.
                    postex_message = postex_data.get('message', 'نامشخص')
                    
                    # تلاش برای نگاشت پیام پستکس به وضعیت‌های داخلی شما
                    new_status = POSTEX_STATUS_MAP.get(postex_message, 'in_transit') # پیش‌فرض به 'in_transit'

                    # به‌روزرسانی زمان‌های ارسال و تحویل
                    if new_status == 'delivered' and shipment.delivered_at is None:
                        shipment.delivered_at = timezone.now()
                    elif new_status == 'shipped' and shipment.shipped_at is None:
                        shipment.shipped_at = timezone.now()

                    if shipment.status != new_status:
                        shipment.status = new_status
                        shipment.save()
                        self.stdout.write(self.style.SUCCESS(
                            f"وضعیت مرسوله {shipment.id} به: {new_status} به‌روز شد (پیام پستکس: '{postex_message}')"
                        ))
                    else:
                        self.stdout.write(self.style.MIGRATE_HEADING(
                            f"وضعیت مرسوله {shipment.id} از قبل {shipment.status} است. نیازی به به‌روزرسانی نیست."
                        ))
                else:
                    self.stdout.write(self.style.ERROR(
                        f"API پستکس برای مرسوله {shipment.id} خطا برگرداند: {postex_data.get('message', 'بدون پیام')}"
                    ))

            except requests.exceptions.Timeout:
                self.stdout.write(self.style.ERROR(
                    f"خطای زمان‌بندی (Timeout) هنگام اتصال به API پستکس برای مرسوله {shipment.id}"
                ))
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(
                    f"خطا در اتصال به API پستکس برای مرسوله {shipment.id}: {e}"
                ))
            except json.JSONDecodeError:
                self.stdout.write(self.style.ERROR(
                    f"خطا در رمزگشایی JSON از API پستکس برای مرسوله {shipment.id}. پاسخ: {response.text[:200]}..."
                ))
            except Exception as e:
                self.stdout.write(self.style.ERROR(
                    f"خطای غیرمنتظره‌ای برای مرسوله {shipment.id} رخ داد: {e}"
                ))

        self.stdout.write(self.style.SUCCESS('Task پیگیری مرسولات با موفقیت به پایان رسید.'))