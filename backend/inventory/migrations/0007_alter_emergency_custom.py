# Generated by Django 5.0.2 on 2024-03-05 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0006_alter_emergency_custom_alter_medication_medicine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emergency',
            name='custom',
            field=models.CharField(blank=True, default='Enter here your custom action recommendations for this emergency!', max_length=1000, null=True),
        ),
    ]
