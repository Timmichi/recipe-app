# backend/core/migrations/0008_alter_quantity_to_decimal.py
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_convert_empty_strings_to_null'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='quantity',
            field=models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True),
        ),
    ]