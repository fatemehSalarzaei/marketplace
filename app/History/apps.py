from django.apps import AppConfig


class HistoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'History'

    def ready(self):
        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('History')
