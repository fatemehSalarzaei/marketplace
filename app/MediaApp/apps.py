from django.apps import AppConfig


class MediaappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'MediaApp'

    def ready(self):
        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('MediaApp')