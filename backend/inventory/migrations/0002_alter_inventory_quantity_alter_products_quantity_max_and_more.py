# Generated by Django 5.0.2 on 2024-02-26 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='quantity',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='products',
            name='quantity_max',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='products',
            name='quantity_min',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='products',
            name='quantity_stock',
            field=models.IntegerField(),
        ),
    ]
