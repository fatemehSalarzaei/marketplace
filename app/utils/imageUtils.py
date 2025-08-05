from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

def compress_image(image_file, max_size=(800, 800), quality=75):
    image = Image.open(image_file)
    image = image.convert('RGB')
    image.thumbnail(max_size, Image.Resampling.LANCZOS)

    output = BytesIO()
    image.save(output, format='JPEG', quality=quality)
    output.seek(0)

    return ContentFile(output.read(), name=image_file.name)
