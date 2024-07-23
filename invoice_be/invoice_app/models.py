from xml.dom.minidom import parseString
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager



class Customer(models.Model):
    customer_id = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=100)
    mail_id = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=100)
    gst_number = models.CharField(max_length=100,default="None")
    state_code = models.CharField(max_length=100)
    

class Product(models.Model):
    product_name = models.CharField(max_length=100)
    product_cost =  models.CharField(max_length=100)
    hsn_no = models.CharField(max_length=100)
    cgst = models.CharField(max_length=100,default=0)
    sgst = models.CharField(max_length=100,default=0)
    igst = models.CharField(max_length=100,default=0)

    
class NewInvoice(models.Model):
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vendor_code = models.CharField(max_length=100)
    invoice_date = models.DateField()
    invoice_no = models.CharField(max_length=100)
    purchase_order_number = models.CharField(max_length=100)

class ProductDetails(models.Model):
    invoice_id = models.ForeignKey(NewInvoice, on_delete=models.CASCADE)
    purchase_id = models.CharField(max_length=100)
    purchase_date = models.DateField()
    no_of_units_allowed = models.PositiveIntegerField()
    cost_per_unit = models.DecimalField(max_digits=10, decimal_places=2)


class InvoicePayments(models.Model):
    invoice_id = models.ForeignKey(NewInvoice, on_delete=models.CASCADE)
    total_amount = models.CharField(max_length=100)
    paid_amount = models.CharField(max_length=100)
    payment_status = models.CharField(max_length=100, default="Pending")
    date = models.CharField(max_length=100)

class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, username, password=None, role="Admin"):
        if not email:
            raise ValueError('Users must have an email')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, role=role)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)

        user.is_superuser = True
        user.role = "Admin"
        user.save(using=self._db)


class UserProfile(AbstractBaseUser, PermissionsMixin):
     username = models.CharField(max_length=100, unique=True)
     email = models.EmailField(max_length=255, unique=True)
     role = models.CharField(max_length=100, default="Admin")
     otp = models.CharField(max_length=10, blank=True, null=True)
     creation_time = models.DateTimeField(default=timezone.now)
     last_login = models.DateTimeField(default=timezone.now)
     status = models.CharField(max_length=100, default="Active")
     is_superuser = models.BooleanField(max_length=100, default=False)
     objects = UserProfileManager()

     USERNAME_FIELD = 'email'
     REQUIRED_FIELDS = []

class AdminProfile(models.Model):
    user_id = models.ForeignKey(UserProfile, related_name="admin_profile", on_delete=models.CASCADE)
    client = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    mail_id = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    pan_number = models.CharField(max_length=100, null=True)
    gst_number = models.CharField(max_length=100)
    account_number = models.CharField(max_length=100)
    bank_name = models.CharField(max_length=100)
    bank_branch = models.CharField(max_length=100)
    ifsc_code = models.CharField(max_length=100)
    file = models.CharField()
