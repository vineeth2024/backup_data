from django.contrib import admin
from .models import Customer,Product,InvoicePayments,AdminProfile,NewInvoice,ProductDetails,UserProfile

# Register your models here.
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(InvoicePayments)
admin.site.register(AdminProfile)
admin.site.register(NewInvoice)
admin.site.register(ProductDetails)
admin.site.register(UserProfile)
