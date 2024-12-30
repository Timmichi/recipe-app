"""
Serializers for the user API View
"""

from django.contrib.auth import (get_user_model, authenticate,)
from django.utils.translation import gettext as _
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object, automatically validate and save things to a model that we define in our serializer"""

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'name'] # Only fields that we want to allow the user to change via the API.
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}} # write_only means the user can write the value and save it, but there won't be a value returned from the API response (they can't read it)

    '''These methods will override existing methods in the ModelSerializer class'''
    def create(self, validated_data):
        """Called when we create new objects. Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        """Called when we update an object. Instance is the model instance that is being updated. validated_data is what has already been passed through our serializer validation (email, password, name)"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()

        return user

class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user auth token"""
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = 'Unable to authenticate with provided credentials'
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs