"""
URL patterns for the recipe app.
"""
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from recipe.views import RecipeViewSet

router = DefaultRouter()
router.register('', RecipeViewSet)
'''
1. Router uses a prefix to generate URL patterns for the RecipeViewSet. But we don't want that prefix, since path('api/recipes/', include('recipe.urls')), already includes the prefix /recipes/, so we can just use an empty string for the prefix here. Otherwise it would be /api/recipes/recipes/ for the URL pattern.
2. It also auto-generates the remaining URL pattern depending on operations available on our viewset. Since we use ModelViewSet, it handles the url for all the CRUD operations e.g. get, post, put, patch, delete.
'''

app_name = 'recipe'
'''This is the app name/namespace that we can use to reverse lookup URLs and helps avoid naming conflicts if there are multiple apps.

The full URL name would be e.g. `recipe/recipe-list/` for a 'get/post' request. `recipe-list` was inferred by looking at the queryset in the RecipeViewSet, which is a list of Recipe objects, and using the lowercase model name 'recipe' as the implied "basename" in {basename}-list.
'''

urlpatterns = [
    path('', include(router.urls)),
]



