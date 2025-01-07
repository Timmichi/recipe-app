from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Item
from item import serializers


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ItemSerializer
    queryset = Item.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return items for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new item"""
        serializer.save(user=self.request.user)
