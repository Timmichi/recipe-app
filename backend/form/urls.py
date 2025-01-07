from django.urls import path, include
from rest_framework.routers import DefaultRouter
from form.views import FormViewSet

app_name = 'form'

router = DefaultRouter()
router.register('', FormViewSet)


urlpatterns = [
    path('', include(router.urls)),
]



