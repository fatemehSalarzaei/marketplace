from django.contrib import admin
from django.apps import apps

app = apps.get_app_config('History')  # نام اپ را وارد کن

for model_name, model in app.models.items():
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
