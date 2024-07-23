from django.urls import path
#from .views import otp , login , dashboard, Customer, Product, addInwardPayments,viewInwardpayments,adminprofile,editadmin,createinvoice,viewinvoice,invoiceslip
#from .views import editInvoice, deleteInvoice, deleteadmin, updateadmin, ,AddUser,ViewUser,DeleteUser
#from .views import viewadmin, UpdateUser, EditUser, verifyotp

from .views import Customer, Product

urlpatterns = [
    '''path("otp" ,otp, name='otp'),
    path("verifyotp" ,verifyotp, name='verifyotp'),
    path('login/',login,name='login'),
    path('dashboard',dashboard,name='dashboard'),'''

    path('api/customer/',Customer.as_views(), name='customer-list'),  
    path('api/customer/<int:pk>/',Customer.as_views(), name='customer-detail'),

    path('api/product/',Product.as_views(), name='product_list'),    
    path('api/product/<int:pk>/',Product.as_views(), name='product-detail'),    

    '''path('addinwardpayments',addInwardPayments, name='addinwardpayments'),   
    path('viewinwardpayments',viewInwardpayments, name='viewinwardpayments'), 
    path('adminprofile',adminprofile, name='adminprofile'),  
    path('editadmin',editadmin, name='editadmin'),
    path('deleteadmin/<int:id>',deleteadmin, name='deleteadmin'), 
    path('updateadmin/<int:id>',updateadmin, name='updateadmin'), 
    path('createinvoice/',createinvoice, name='createinvoice'), 
    path('viewinvoice',viewinvoice, name='viewinvoice'),   
    path('editinvoice/<int:id>',editInvoice, name='editInvoice'),
    path('deleteinvoice/<int:id>',deleteInvoice, name='deleteInvoice'), 
    path('invoiceslip/<int:id>',invoiceslip, name='invoiceslip'), 
    path('adduser',AddUser,name="AddUser"),                 
    path('viewusers',ViewUser,name="ViewUser"),             
    path('deleteuser/<int:id>',DeleteUser,name="DeleteUser"), 
    path('updateuser/<int:id>',UpdateUser, name="UpdateUser"),
    path('viewadmin',viewadmin, name="viewadmin"),
    path('edituser/<int:id>',EditUser, name='EditUser'),'''
]
