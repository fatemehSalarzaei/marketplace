# views.py
from django.contrib.contenttypes.models import ContentType
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from PageBuilder.models import Element

class RelatedObjectByElementView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        element_id = request.query_params.get("element_id")
        search = request.query_params.get("search", "").strip()

        if not element_id:
            return Response({"error": "element_id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            element = Element.objects.select_related("element_type__content_type").get(id=element_id)
        except Element.DoesNotExist:
            return Response({"error": "Element not found"}, status=status.HTTP_404_NOT_FOUND)

        content_type = element.element_type.content_type
        if not content_type:
            return Response({"error": "This element type has no content_type linked"}, status=status.HTTP_400_BAD_REQUEST)

        model_class = content_type.model_class()
        if not model_class:
            return Response({"error": "No model found for this content_type"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = model_class.objects.all()

        # جستجو بر اساس name یا title
        if search:
            if hasattr(model_class, "name"):
                queryset = queryset.filter(name__icontains=search)
            elif hasattr(model_class, "title"):
                queryset = queryset.filter(title__icontains=search)

        results = [
            {
                "id": obj.id,
                "name": getattr(obj, "name", getattr(obj, "title", str(obj)))
            }
            for obj in queryset[:50]
        ]

        return Response(results)
