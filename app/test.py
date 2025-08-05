import json
from django.apps import apps
from django.core.serializers.json import DjangoJSONEncoder

def get_models_structure():
    result = {}
    for model in apps.get_models():
        model_name = model.__name__
        fields = []
        for field in model._meta.get_fields():
            if not field.is_relation or field.one_to_one or field.many_to_one:
                fields.append(
                    field.name,
                   )
        result[model_name] = fields

    # ذخیره در فایل JSON
    with open("models_structure.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, cls=DjangoJSONEncoder, ensure_ascii=False)

if __name__ == "__main__":
    import django
    import os
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")  # مسیر تنظیمات پروژه‌ات را تنظیم کن
    django.setup()
    get_models_structure()
