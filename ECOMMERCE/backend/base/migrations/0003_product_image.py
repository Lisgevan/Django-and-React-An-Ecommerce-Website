# Generated by Django 3.2.7 on 2021-10-20 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20211020_1227'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
