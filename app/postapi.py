import requests
import json

def track_postex_by_order_id(order_id, api_key):
    """
    برای پیگیری مرسوله پستی با استفاده از order-id به API پستکس درخواست ارسال می‌کند.

    Args:
        order_id (str or int): شماره سفارش مرسوله برای پیگیری.
        api_key (str): کلید API شما برای احراز هویت (x-api-key).

    Returns:
        dict or None: دیکشنری شامل پاسخ API (isSuccess و message) در صورت موفقیت،
                      در غیر این صورت None.
    """
    # ساخت URL با order-id
    url = f"https://api.postex.ir/api/v1/tracking/by-order-id/{order_id}?order-id={order_id}"

    # تنظیم هدر شامل x-api-key
    headers = {
        "x-api-key": api_key,
        "Content-Type": "application/json" # معمولا برای درخواست‌های API توصیه می‌شود
    }

    try:
        # ارسال درخواست GET به API
        response = requests.get(url, headers=headers)

        # بررسی کد وضعیت HTTP برای اطمینان از موفقیت درخواست
        response.raise_for_status() # اگر کد وضعیت 4xx یا 5xx باشد، یک استثنا ایجاد می‌کند
        print(response)
        # تبدیل پاسخ JSON به دیکشنری پایتون
        data = response.json()
        return data

    except requests.exceptions.HTTPError as http_err:
        print(f"خطای HTTP: {http_err}")
        print(f"پاسخ سرور: {response.text}") # نمایش جزئیات پاسخ در صورت خطا
        return None
    except requests.exceptions.ConnectionError as conn_err:
        print(f"خطای اتصال: {conn_err}")
        return None
    except requests.exceptions.Timeout as timeout_err:
        print(f"خطای Timeout: {timeout_err}")
        return None
    except requests.exceptions.RequestException as req_err:
        print(f"خطای نامشخص در درخواست: {req_err}")
        return None
    except json.JSONDecodeError:
        print("خطا در رمزگشایی پاسخ JSON. پاسخ دریافتی JSON معتبر نیست.")
        print(f"پاسخ سرور: {response.text}")
        return None

# --- نحوه استفاده از تابع ---
if __name__ == "__main__":
    # !!! این مقادیر را با order-id و API Key واقعی خود جایگزین کنید !!!
    your_order_id = "04166033"  # مثال: شماره سفارش واقعی خود را اینجا وارد کنید
    your_api_key = "postex_ac601eab1875452PUp2oJbpnVvXhtZW7agTvtbFBZNOBc" # کلید API پستکس خود را اینجا وارد کنید

    if your_api_key == "YOUR_POSTEX_API_KEY":
        print("لطفاً 'your_api_key' را با کلید API واقعی خود از پستکس جایگزین کنید.")
    elif your_order_id == "123456":
        print("لطفاً 'your_order_id' را با شماره سفارش واقعی خود جایگزین کنید.")
    else:
        print(f"در حال ارسال درخواست برای order-id: {your_order_id}...")
        result = track_postex_by_order_id(your_order_id, your_api_key)

        if result:
            print("\n--- نتیجه پیگیری ---")
            print(f"وضعیت موفقیت (isSuccess): {result.get('isSuccess')}")
            print(f"پیام (message): {result.get('message')}")
        else:
            print("\nخطا در دریافت اطلاعات پیگیری.")