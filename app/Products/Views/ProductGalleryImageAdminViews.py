from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

from Products.models import  ProductGalleryImage
from Products.Serializers import  ProductGalleryImageAdminSerializer


from app .permissions import HasModelPermission 

class ProductGalleryImageAdminViewSet(viewsets.ModelViewSet):
    queryset = ProductGalleryImage.objects.all()
    serializer_class = ProductGalleryImageAdminSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser , HasModelPermission]
    
    def get_queryset(self):
        product_id = self.request.query_params.get('product')
        if product_id:
            return self.queryset.filter(product_id=product_id)
        return self.queryset.none()
