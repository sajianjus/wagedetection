# Generated by Django 4.2.3 on 2023-08-04 04:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_customuser_reset_password_secret'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'verbose_name_plural': 'Users'},
        ),
    ]