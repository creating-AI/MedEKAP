# Generated by Django 5.0.2 on 2024-03-05 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_alter_medication_medicine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emergency',
            name='custom',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='medication',
            name='medicine',
            field=models.CharField(max_length=100),
        ),
    ]
