"""
View for the user API

A view receives the request, uses the serializer (which validates, e.g. creates a new user in the system, and returns the user), and constructs an HTTP response with the data that we want to return to the client.
"""
from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from user.serializers import UserSerializer, AuthTokenSerializer

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer # This is the serializer that we want to use for the view (we use email vs username)
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class ManageUserView(generics.RetrieveUpdateDestroyAPIView):
    """Manage (get, update, delete) the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Simply retrieve and return authenticated user in response. Used for single views. get_queryset is used for list views."""
        return self.request.user

