"""
Serializers for recipe APIs
"""
from rest_framework import serializers

from core.models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for ingredient objects"""
    id = serializers.IntegerField(required=False) # This is necessary because the id is read-only by default. id becomes writable and will be included in validated_data. This is optional because new ingredients will not have an id.

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity', 'measurement', 'price']


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipe objects"""

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'time_minutes', 'price', 'link']
        # read_only_fields = ['id'] This is not necessary since the id is read-only by default


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for a recipe detail"""
    ingredients = IngredientSerializer(many=True, required=False) # this is a nested serializer that will be used to serialize the ingredients. required=False is necessary because we want to allow the ingredients to be optional.

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description', 'ingredients']

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients', [])
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients', [])
        instance = super().update(instance, validated_data)
        
        ingredients_data_ids = {ingredient_data.get('id') for ingredient_data in ingredients_data}
        instance.ingredients.exclude(id__in=ingredients_data_ids).delete() # Delete ingredients that are not in the ingredients_data
        existing_ingredients = {i.id: i for i in instance.ingredients.all()}
        for ingredient_data in ingredients_data:
            ingredient_id = ingredient_data.pop('id', None)
            if ingredient_id and ingredient_id in existing_ingredients:
                # Update existing
                ingredient = existing_ingredients[ingredient_id]
                for attr, value in ingredient_data.items():
                    setattr(ingredient, attr, value)
                ingredient.save()
            else:
                # Create new without id field
                ingredient_data.pop('id', None)  # Ensure id is removed
                Ingredient.objects.create(recipe=instance, **ingredient_data)
                
        return instance