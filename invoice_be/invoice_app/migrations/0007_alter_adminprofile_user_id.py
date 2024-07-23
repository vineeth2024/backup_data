# Generated by Django 4.2.3 on 2024-01-09 10:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('invoice_app', '0006_alter_adminprofile_pan_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adminprofile',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='admin_profile', to=settings.AUTH_USER_MODEL),
        ),
    ]