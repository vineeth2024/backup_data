# Generated by Django 4.2.3 on 2024-01-07 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoice_app', '0002_newinvoice_customer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='newinvoice',
            name='purchase_order_number',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
