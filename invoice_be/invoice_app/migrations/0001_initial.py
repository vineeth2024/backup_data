# Generated by Django 4.2.3 on 2024-01-05 10:47

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=100)),
                ('mail_id', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=100)),
                ('company_name', models.CharField(max_length=100)),
                ('pan_number', models.CharField(max_length=100)),
                ('gst_number', models.CharField(max_length=100)),
                ('account_number', models.CharField(max_length=100)),
                ('bank_name', models.CharField(max_length=100)),
                ('bank_branch', models.CharField(max_length=100)),
                ('ifsc_code', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_id', models.CharField(max_length=100)),
                ('mobile_number', models.CharField(max_length=100)),
                ('mail_id', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('pin_code', models.CharField(max_length=100)),
                ('gst_number', models.CharField(default='None', max_length=100)),
                ('state_code', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='NewInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vendor_code', models.CharField(max_length=100)),
                ('invoice_date', models.DateField()),
                ('invoice_no', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=100)),
                ('product_cost', models.CharField(max_length=100)),
                ('hsn_no', models.CharField(max_length=100)),
                ('cgst', models.CharField(default=0, max_length=100)),
                ('sgst', models.CharField(default=0, max_length=100)),
                ('igst', models.CharField(default=0, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ProductDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_id', models.CharField(max_length=100)),
                ('purchase_date', models.DateField()),
                ('no_of_units_allowed', models.PositiveIntegerField()),
                ('cost_per_unit', models.DecimalField(decimal_places=2, max_digits=10)),
                ('invoice_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='invoice_app.newinvoice')),
            ],
        ),
        migrations.CreateModel(
            name='InvoicePayments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_amount', models.CharField(max_length=100)),
                ('paid_amount', models.CharField(max_length=100)),
                ('payment_status', models.CharField(default='Pending', max_length=100)),
                ('date', models.CharField(max_length=100)),
                ('invoice_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='invoice_app.newinvoice')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('role', models.CharField(default='Admin', max_length=100)),
                ('otp', models.CharField(blank=True, max_length=10, null=True)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(default='Active', max_length=100)),
                ('is_superuser', models.BooleanField(default=False, max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
