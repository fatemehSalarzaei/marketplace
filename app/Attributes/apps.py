from django.apps import AppConfig


class AttributesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Attributes'

    def ready(self):
        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('Attributes')
