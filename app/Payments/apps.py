from django.apps import AppConfig


class PaymentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Payments'

    def ready(self):
        import Payments.signals
        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('Payments')