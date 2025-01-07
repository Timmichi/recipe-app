from django.urls import path, include
from rest_framework.routers import DefaultRouter
from item.views import ItemViewSet

app_name = 'item'

router = DefaultRouter()
router.register('', ItemViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



