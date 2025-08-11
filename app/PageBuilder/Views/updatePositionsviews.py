# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from PageBuilder.models import Element

@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_positions(request):
    """
    دریافت لیستی از المان‌ها با id و position جدید
    [
        {"id": 3, "position": 1},
        {"id": 5, "position": 2},
        ...
    ]
    """
    data = request.data
    if not isinstance(data, list):
        return Response({"detail": "لیست موقعیت‌ها باید ارسال شود."}, status=status.HTTP_400_BAD_REQUEST)

    for item in data:
        try:
            element = Element.objects.get(id=item['id'])
            element.position = item['position']
            element.save()
        except (Element.DoesNotExist, KeyError):
            continue

    return Response({"detail": "موقعیت‌ها به‌روزرسانی شدند."})
