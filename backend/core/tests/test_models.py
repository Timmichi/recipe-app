"""
Tests for models
"""
from decimal import Decimal
from django.test import TestCase
from django.contrib.auth import get_user_model
# from core.models import Item


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'test@example.com'
        password = 'testpass123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password)) # We can't check the password directly, because it's hashed
    
    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        sample_emails = [
            ['test1@EXAMPLE.com', 'test1@example.com'],
            ['Test2@Example.com', 'Test2@example.com'],
            ['TEST3@EXAMPLE.COM', 'TEST3@example.com']
        ]
        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, 'testpass123')
            self.assertEqual(user.email, expected)

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'testpass123')
    
    def test_create_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            email='test@example.com',
            password='testpass123'
        )
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)