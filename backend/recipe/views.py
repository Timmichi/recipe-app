"""
Views for the recipe API
"""
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Recipe
from recipe import serializers


class RecipeViewSet(viewsets.ModelViewSet):
    """View for manage recipe APIs"""
    serializer_class = serializers.RecipeDetailSerializer
    queryset = Recipe.objects.all() #  ModelViewSet is expected to work with a model and we are specifying the queryset of objects that is manageable by the APIs available through our ModelViewSet.
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] # In order to use the API, the user must be authenticated

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-created_at', '-id')
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == 'list': # If the action is list (GET), we want to return the RecipeSerializer. Otherwise, we return the RecipeDetailSerializer since we want to show the description field.
            return serializers.RecipeSerializer
        return self.serializer_class
