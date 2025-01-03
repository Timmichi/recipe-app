from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Recipe
from recipe import serializers


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.RecipeDetailSerializer
    queryset = Recipe.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-created_at', '-id')
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """If the action is list (GET), we want to return the RecipeSerializer. Otherwise, we return the RecipeDetailSerializer since we want to show the description field."""
        if self.action == 'list':
            return serializers.RecipeSerializer
        return self.serializer_class
