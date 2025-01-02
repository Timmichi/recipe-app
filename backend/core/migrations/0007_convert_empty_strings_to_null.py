# backend/core/migrations/0007_convert_empty_strings_to_null.py
from django.db import migrations

def convert_empty_strings_to_null(apps, schema_editor):
    Ingredient = apps.get_model('core', 'Ingredient')
    Ingredient.objects.filter(quantity='').update(quantity=None)

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_allow_null_quantity'),
    ]

    operations = [
        migrations.RunPython(convert_empty_strings_to_null),
    ]