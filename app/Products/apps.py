from django.apps import AppConfig


class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Products'

    def ready(self):
        import Products.signals  # ایمپورت سیگنال‌ها

        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('Products')
