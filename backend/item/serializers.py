from rest_framework import serializers
from core.models import Item

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['id', 'name']
        # read_only_fields = ['id'] This is not necessary since the id is read-only by default