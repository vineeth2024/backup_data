from django.urls import path
from .views import CustomerView, ProductView, InwardPaymentsView, AdminProfileView, UsersView, SendOTPView, VerifyOTPView, RegisterUserView, CustomTokenObtainPairView
from .views import InvoiceView, InvoiceSlipView, DashboardView, SendInvoiceSlipView



urlpatterns = [
    path('api/customer/', CustomerView.as_view(), name='customer-list'),
    path('api/customer/<int:pk>/', CustomerView.as_view(), name='customer-detail'),

    path('api/product/', ProductView.as_view(), name='product-list'),
    path('api/product/<int:pk>/', ProductView.as_view(), name='product-detail'),

    path('api/inwardpayments/', InwardPaymentsView.as_view(), name='inwardpayments-list'),
    path('api/inwardpayments/<int:pk>/', InwardPaymentsView.as_view(), name='inwardpayments-detail'),

    path('api/adminprofile/<int:pk>/', AdminProfileView.as_view(), name='adminprofile-detail'),

    path('api/user/', UsersView.as_view(), name='user-list'),
    path('api/user/<int:pk>/', UsersView.as_view(), name='user-detail'),


    path('api/invoice/', InvoiceView.as_view(), name='invoice-list'),
    path('api/invoice/<int:pk>/', InvoiceView.as_view(), name='invoice-detail'),


    path('api/sendotp', SendOTPView.as_view(), name='sendotp'),
    path('api/verifyotp', VerifyOTPView.as_view(), name='verifyotp'),
    
    path('api/register', RegisterUserView.as_view(), name='user_register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name ='token_obtain_pair'),
   
    path('api/dashboard', DashboardView.as_view(), name ='dashboard'),

    path('api/invoiceslip/<int:user_id>/<int:invoice_id>', InvoiceSlipView.as_view(), name='invoiceslip'),
    path('api/sendinvoiceslip/<int:user_id>/<int:invoice_id>', SendInvoiceSlipView.as_view(), name='sendinvoiceslip'),
]
