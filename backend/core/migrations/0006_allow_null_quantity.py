# backend/core/migrations/0006_allow_null_quantity.py
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20241231_0934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='quantity',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]