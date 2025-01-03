from rest_framework import serializers
from core.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'time_minutes', 'price', 'link']
        # read_only_fields = ['id'] This is not necessary since the id is read-only by default


class RecipeDetailSerializer(RecipeSerializer):
    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description']