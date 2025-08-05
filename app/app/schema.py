from drf_spectacular.openapi import AutoSchema

class TaggedAutoSchema(AutoSchema):
    def get_override_parameters(self):
        # استخراج نام اپلیکیشن از مسیر ویو
        module = self.view.__module__
        app_name = module.split('.')[0].capitalize()
        self._operation.setdefault('tags', [app_name])
        return super().get_override_parameters()
