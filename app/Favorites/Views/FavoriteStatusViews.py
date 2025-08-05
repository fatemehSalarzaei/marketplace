# favorites/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Favorites.models import Favorite
from Favorites.Serializers import FavoriteCheckSerializer

class FavoriteStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = FavoriteCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user

        product_id = serializer.validated_data.get("product")
        variant_id = serializer.validated_data.get("variant")

        is_favorited = False

        if product_id:
            is_favorited = Favorite.objects.filter(user=user, product_id=product_id).exists()
        elif variant_id:
            is_favorited = Favorite.objects.filter(user=user, variant_id=variant_id).exists()

        return Response({"is_favorited": is_favorited})
