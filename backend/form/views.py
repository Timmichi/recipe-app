from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Form
from form import serializers


class FormViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FormSerializer
    queryset = Form.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new form"""
        serializer.save(user=self.request.user)
