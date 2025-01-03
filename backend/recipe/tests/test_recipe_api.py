"""
Tests for the recipe API

When to use serializer in testing:

Using Serializers: Serializers are used to validate the API responses for retrieving recipe details and lists of recipes. This ensures that the API returns the correct data.
Direct Attribute Access: Direct attribute access (e.g., getattr) is used to compare the values in the database with the expected values after creating or updating a recipe. This ensures that the data was correctly saved to the database.
"""

from decimal import Decimal
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Recipe

from recipe.serializers import RecipeSerializer, RecipeDetailSerializer


RECIPES_URL = reverse('recipe:recipe-list') # /api/recipes/


# Helper function so we don't have to rewrite test inputs
def create_recipe(user, **params):
    """Create and return a sample recipe"""
    defaults = {
        'title': 'Sample recipe',
        'time_minutes': 10,
        'price': '5.00',
        'description': 'Sample recipe description',
        'link': 'https://example.com/recipe',
    }
    defaults.update(params) # We can override the defaults with the params that we pass in. Otherwise, we use the defaults.

    return Recipe.objects.create(user=user, **defaults)

def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)

def detail_url(recipe_id):
    """Return recipe detail URL"""
    return reverse('recipe:recipe-detail', args=[recipe_id]) # /api/recipe/recipes/1/


class UnauthedRecipeAPITests(TestCase):
    """Test unauthenticated recipe API requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required to call API"""
        res = self.client.get(RECIPES_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthedRecipeAPITests(TestCase):
    """Test authenticated recipe API requests"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='user@example.com',
            password='testpass123',
        )
        self.client.force_authenticate(self.user)
    
    def test_retrieve_recipes(self):
        """Test retrieving a list of recipes"""
        create_recipe(user=self.user)
        create_recipe(user=self.user)

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.filter(user=self.user).order_by('id') # order_by('-id') means we're ordering by the id in descending order
        serializer = RecipeSerializer(recipes, many=True) # many=True means we're serializing a queryset, not a single object.
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_recipes_limited_to_user(self):
        """Test retrieving recipes for user"""
        user2 = get_user_model().objects.create_user(
            email='other@example.com',
            password='testpass123',
        )
        create_recipe(user=user2)
        create_recipe(user=self.user)

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.filter(user=self.user)
        serializer = RecipeSerializer(recipes, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_view_recipe_detail(self):
        """Test get recipe detail"""
        recipe = create_recipe(user=self.user)
        url = detail_url(recipe.id)
        res = self.client.get(url)

        serializer = RecipeDetailSerializer(recipe) # not many=True because we're serializing a single object
        self.assertEqual(res.data, serializer.data)

    def test_create_recipe(self):
        """Test creating a recipe"""
        payload = {
            'title': 'Chocolate chip cookies',
            'time_minutes': 30,
            'price': Decimal('10.50'), # It doesn't matter if we do this or do '10.50' since JSON doesn't have a native Decimal type so it converts it to string anyways. In this case, we use Decimal() for testing since we are comparing it to the serialized output in the database which will be a Decimal.
            'description': 'Bake a delicious batch of chocolate chip cookies',
        }
        res = self.client.post(RECIPES_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(id=res.data['id'])
        self.assertEqual(recipe.user, self.user)
        for key, value in payload.items():
            self.assertEqual(getattr(recipe, key), value)
        
    def test_partial_update(self):
        """Test partial update of a recipe."""
        original_link = 'https://example.com/recipe.pdf'
        recipe = create_recipe(
            user=self.user,
            title='Sample recipe title',
            link=original_link,
        )

        payload = {'title': 'New recipe title'}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db() # Refresh the recipe object from the database. We need to do this because the recipe object in memory is not updated with the new values from the database.
        self.assertEqual(recipe.title, payload['title'])
        self.assertEqual(recipe.link, original_link)
        self.assertEqual(recipe.user, self.user)

    def test_full_update(self):
        """Test full update of recipe."""
        recipe = create_recipe(
            user=self.user,
            title='Sample recipe title',
            link='https://exmaple.com/recipe.pdf',
            description='Sample recipe description.',
        )

        payload = {
            'title': 'New recipe title',
            'link': 'https://example.com/new-recipe.pdf',
            'description': 'New recipe description',
            'time_minutes': 10,
            'price': Decimal('2.50'),
        }
        url = detail_url(recipe.id)
        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db()
        for k, v in payload.items():
            self.assertEqual(getattr(recipe, k), v)
        self.assertEqual(recipe.user, self.user)

    def test_update_user_returns_error(self):
        """Test changing the recipe user results in an error."""
        new_user = create_user(email='user2@example.com', password='test123')
        recipe = create_recipe(user=self.user)

        payload = {'user': new_user.id}
        url = detail_url(recipe.id)
        self.client.patch(url, payload)

        recipe.refresh_from_db()
        self.assertEqual(recipe.user, self.user)

    def test_delete_recipe(self):
        """Test deleting a recipe successful."""
        recipe = create_recipe(user=self.user)

        url = detail_url(recipe.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Recipe.objects.filter(id=recipe.id).exists())

    def test_recipe_other_users_recipe_error(self):
        """Test trying to delete another users recipe gives error."""
        new_user = create_user(email='user2@example.com', password='test123')
        recipe = create_recipe(user=new_user)

        url = detail_url(recipe.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Recipe.objects.filter(id=recipe.id).exists())