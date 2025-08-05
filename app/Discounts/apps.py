from django.apps import AppConfig


class DiscountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Discounts'


    def ready(self):
        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('Discounts')