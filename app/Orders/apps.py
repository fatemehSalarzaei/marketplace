from django.apps import AppConfig


class OrdersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Orders'

    def ready(self):
        import Orders.signals  

        from utils.auditlogRegistry import register_all_models_from_app
        register_all_models_from_app('Orders')