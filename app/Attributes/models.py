from django.db import models


class Attribute(models.Model):
    name = models.CharField(max_length=100, unique=True)  # مثل: رنگ، سایز، جنس
    slug = models.SlugField(max_length=100, unique=True)
    use_predefined_values = models.BooleanField(default=False) 
    for_variant = models.BooleanField(default=False)  

    def __str__(self):
        return self.name

class AttributeGroup(models.Model):
    attribute = models.ManyToManyField(Attribute, related_name='attributes', blank=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name



class AttributeValue(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, related_name='values')
    value = models.CharField(max_length=100)

    class Meta:
        unique_together = ('attribute', 'value')

    def __str__(self):
        return f"{self.attribute.name}: {self.value}"

