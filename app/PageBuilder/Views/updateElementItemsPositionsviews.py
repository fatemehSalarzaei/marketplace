from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from PageBuilder.models import ElementItem


@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_element_items_positions(request):
    """
    دریافت لیستی از آیتم‌ها با id و position جدید
    [
        {"id": 10, "position": 1},
        {"id": 12, "position": 2},
        ...
    ]
    """
    data = request.data
    if not isinstance(data, list):
        return Response({"detail": "لیست موقعیت‌ها باید ارسال شود."}, status=status.HTTP_400_BAD_REQUEST)

    for item in data:
        try:
            element_item = ElementItem.objects.get(id=item['id'])
            element_item.position = item['position']
            element_item.save()
        except (ElementItem.DoesNotExist, KeyError):
            continue

    return Response({"detail": "موقعیت آیتم‌ها به‌روزرسانی شدند."})
