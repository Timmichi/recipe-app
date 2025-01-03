from django.urls import path
from user.views import CreateUserView, CreateTokenView, ManageUserView

app_name = 'user'

# as_view() converts the class-based view into a Django view
# name='create' is the name of the URL that we can use to reverse lookup: reverse('user:create')
urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('token/', CreateTokenView.as_view(), name='token'),
    path('me/', ManageUserView.as_view(), name='me'),
]