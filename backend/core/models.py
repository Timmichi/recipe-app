"""
Database models
"""
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    """Manager for user model"""
    
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password) # Hash the password
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password):
        """Create and return a new superuser. There could be an admin that isn't a superuser who can't access models in Django admin"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user


class User(AbstractBaseUser, PermissionsMixin): # AbstractBaseUser contains functionality for authentication system, PermissionsMixin contains functionality for permissions
    """Custom user model for users in our system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) # required by Django admin interface to determine if user can login to Django admin

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Recipe(models.Model): # Vanilla Django model
    """Recipe object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    time_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2) # Will coerce to a string by default when reserialized to JSON
    link = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    """Ingredient object"""
    recipe = models.ForeignKey(
        Recipe,
        related_name='ingredients',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    measurement = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name