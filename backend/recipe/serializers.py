"""
Serializers for recipe APIs
"""
from rest_framework import serializers

from core.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipe objects"""

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'time_minutes', 'price', 'link']
        read_only_fields = ['id'] # We don't want the user to be able to change the ID of the recipe, but we want to return it in the response


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for a recipe detail"""
    # We can use the RecipeSerializer and override the fields that we want to be read-only
    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description']