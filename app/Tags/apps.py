from django.apps import AppConfig


class TagsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Tags'


    def ready(self):
        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('Tags')