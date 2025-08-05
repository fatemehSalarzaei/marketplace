from django.apps import apps
from auditlog.registry import auditlog

def register_all_models_from_app(app_label):
    app_config = apps.get_app_config(app_label)
    for model in app_config.get_models():
        try:
            auditlog.register(model)
        except Exception as e:
            print(f"خطا در ثبت مدل {model.__name__}: {e}")
