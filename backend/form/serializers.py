from rest_framework import serializers
from core.models import Form

class FormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Form
        fields = ['id', 'title']
        # read_only_fields = ['id'] This is not necessary since the id is read-only by default