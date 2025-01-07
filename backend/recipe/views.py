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
    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all() #  ModelViewSet is expected to work with a model and we are specifying the queryset of objects that is manageable by the APIs available through our ModelViewSet.
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] # In order to use the API, the user must be authenticated

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-id') # We are filtering the queryset to only return objects that belong to the authenticated user. We are also ordering the results by the ID in descending order.
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
