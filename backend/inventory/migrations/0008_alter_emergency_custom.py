# Generated by Django 5.0.2 on 2024-03-05 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0007_alter_emergency_custom'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emergency',
            name='custom',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
