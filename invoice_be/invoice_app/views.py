from django.shortcuts import render,redirect,HttpResponse
from .models import Customer, Product, InvoicePayments, AdminProfile, NewInvoice, ProductDetails, UserProfile
from .serializers import CustomerSerializer, ProductSerializer, InwardPaymentsSerializer, AdminProfileSerializer, NewInvoiceSerializer, ProductDetailsSerializer, UserProfileSerializer, CustomTokenObtainPairSerializer
import random
from django.core.mail import send_mail, EmailMessage, EmailMultiAlternatives
from django.conf import settings
import datetime
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from num2words import num2words
from datetime import datetime
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from pathlib import Path
from django.template.loader import get_template
import pdfkit
import os
from django.core.mail import EmailMessage
from django.utils import timezone
from datetime import timedelta


def send_email_with_attachment(subject, message, from_email, recipient_list, attachment_path):

    #mime_type = magic.from_buffer(file_content, mime=True)
    mail = EmailMessage(subject, message, settings.EMAIL_HOST_USER, recipient_list)
    #mail.attach("invoice.pdf", file_content, mime_type)
    mail.attach_file(attachment_path)
    mail.send(fail_silently=False)


def send_invoice(path, to_address):
    try:
        msg = EmailMessage(
            "Invoice attachment",
            "PFA"
            "pavankumarr.pbt@gmail.com",
             to_address,
        )
        #msg.attach_file(path)
        msg.send(fail_silently=False)
        return {"message": "sent successfully"}, None
    except Exception as e:
        print(str(e))
        return None, str(e)



@method_decorator(csrf_exempt, name='dispatch')
class VerifyOTPView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        otp = data['otp']
        try:
            user = Users.objects.get(email=email)
            if otp != user.otp:
                return HttpResponse("Invalid Credentials" ,status=400 )
            obj = {
              "role": user.role,
              "access_token": "",
              "refresh_token": "",
            }
            return JsonResponse(obj)
        except Exception as e:
            return JsonResponse({"data": "internal error" + str(e)})    


@method_decorator(csrf_exempt, name='dispatch')
class SendOTPView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        is_valid = False
        if Users.objects.filter(email=email, password=password).exists():
            is_valid = True
        elif Users.objects.filter(username=email, password=password).exists():
            is_valid = True
            email = email = Users.objects.filter(username=email).values('email').first() 
        else:
            return HttpResponse("Invalid Credentials" ,status=400 )
        otp = "123456"
        try:
           #send_mail(
           # 'OTP Verification',
           # 'Your Invoice login OTP: '+ otp,
           # "usmanbashap@pathbreakertech.com",
           # settings.EMAIL_HOST_USER,
           # [email],
           # False,
           # )
            user = Users.objects.get(email=email)
            user.otp = otp
            user.save()

        except Exception as e:
            return JsonResponse({"data": "OTP sent Failed" + str(e)})    

        return JsonResponse({"data": "OTP sent successfully"})


@method_decorator(csrf_exempt, name='dispatch')
class DashboardView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def get(self, request):
        
        total_rows_count = NewInvoice.objects.all().count()
        total_cus = Customer.objects.all().count()
        last_month_start = timezone.now() - timedelta(days=timezone.now().day)
        last_month_start = last_month_start.replace(day=1)

        last_month_end = last_month_start + timedelta(days=31)

        total_invoices_last_month = NewInvoice.objects.filter(invoice_date__range=(last_month_start, last_month_end)).count()

        result = {
            'no_of_customers':total_rows_count,
            'invoices_raised':total_cus,
            'invoices_raised_last_month': total_invoices_last_month,
        }
        return JsonResponse({"data": result})


@method_decorator(csrf_exempt, name='dispatch')
class CustomerView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk is not None:
            try:
                customer = Customer.objects.get(pk=pk)
            except Customer.DoesNotExist:
                return Response({'error': 'customer details not found'}, status=status.HTTP_400_BAD_REQUEST)
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        else:
            customers = Customer.objects.all()
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data)
    
    def put(self, request, pk=None):
        if pk is not None:
            try:
                customer = Customer.objects.get(pk=pk)
                serializer = CustomerSerializer(customer, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
            except Customer.DoesNotExist:
                return Response({'error': 'customer details not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid customer ID.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                customer = Customer.objects.get(pk=pk)
                customer.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Customer.DoesNotExist:
                return Response({'error': 'customer details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid customer ID.'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class ProductView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk is not None:
            try:
                customer = Product.objects.get(pk=pk)
                serializer = ProductSerializer(customer)
                return Response(serializer.data)
            except Product.DoesNotExist:
                return Response({'error': 'product details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            customers = Product.objects.all()
            serializer = ProductSerializer(customers, many=True)
            return Response(serializer.data)
    
    def put(self, request, pk=None):
        if pk is not None:
            try:
                customer = Product.objects.get(pk=pk)
                serializer = ProductSerializer(customer, data=request.data)
                if serializer.is_valid():
                     serializer.save()
                     return Response(serializer.data)
            except Product.DoesNotExist:
                return Response({'error': 'product details not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid product ID.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                customer = Product.objects.get(pk=pk)
                customer.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Product.DoesNotExist:
                return Response({'error': 'product details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid product ID.'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class InwardPaymentsView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def post(self, request):
        serializer = InwardPaymentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk is not None:
            try:
                customer = InvoicePayments.objects.get(pk=pk)
                serializer = InwardPaymentsSerializer(customer)
                return Response(serializer.data)
            except InwardPayments.DoesNotExist:
                return Response({'error': 'inward payments details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            customers = InvoicePayements.objects.all()
            serializer = InwardPaymentsSerializer(customers, many=True)
            return Response(serializer.data)


@method_decorator(csrf_exempt, name='dispatch')
class AdminProfileView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def post(self, request, pk=None):
        if pk == None:
            return Response({'error': 'Please provide a valid user id.'}, status=status.HTTP_400_BAD_REQUEST)
        
        request_data = json.loads(request.body)

        try:
            user_profile = UserProfile.objects.get(pk=pk)
        
            client = request_data.get('client')
            gender = request_data.get('gender')
            mail_id = request_data.get('mail_id')
            address = request_data.get('address')
            state = request_data.get('state')
            phone_number = request_data.get('phone_number')
            company_name = request_data.get('company_name')
            pan_number = request_data.get('pan_number')
            gst_number = request_data.get('gst_number')
            account_number = request_data.get('account_number')
            bank_name = request_data.get('bank_name')
            bank_branch = request_data.get('bank_branch')
            ifsc_code = request_data.get('ifsc_code')
            file = request_data.get('file')

            admin_profile = AdminProfile.objects.create(
                    user_id=user_profile,
                    client=client,
                    gender=gender,
                    mail_id=mail_id,
                    address=address,
                    state=state,
                    phone_number=phone_number,
                    company_name=company_name,
                    pan_number=pan_number,
                    gst_number=gst_number,
                    account_number=account_number,
                    bank_name=bank_name,
                    bank_branch=bank_branch,
                    ifsc_code=ifsc_code,
                    file=file,
            )

            return JsonResponse({'message': 'AdminProfile saved successfully', 'admin_profile_id': admin_profile.id}, status=201)
        except (Exception, json.JSONDecodeError) as e :
            print(str(e))
            return JsonResponse({'error': 'Invalid JSON data {}'.format(str(e))}, status=400)

    def get(self, request, pk=None):
        if pk is not None:
            try:
                customer = AdminProfile.objects.get(pk=pk)
                serializer = AdminProfileSerializer(customer)
                return Response(serializer.data)
            except AdminProfile.DoesNotExist:
                return Response({'error': 'admin profile details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            customers = AdminProfile.objects.all()
            serializer = AdminProfileSerializer(customers, many=True)
            return Response(serializer.data)
    
    def put(self, request, pk=None):
        if pk is not None:
            try:
                customer = AdminProfile.objects.get(pk=pk)
                serializer = AdminProfileSerializer(customer, data=request.data)
                if serializer.is_valid():
                     serializer.save()
                     return Response(serializer.data)
            except AdminProfile.DoesNotExist:
                return Response({'error': 'admin profile details not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid user id.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                customer = AdminProfile.objects.get(pk=pk)
                customer.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except AdminProfile.DoesNotExist:
                return Response({'error': 'Admin profile details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid admin profile ID.'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class UsersView(APIView):
    permission_classes = (IsAuthenticated, ) 
    '''def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''

    def get(self, request, pk=None):
        if pk is not None:
            try:
                customer = UserProfile.objects.get(pk=pk)
                serializer = UserProfileSerializer(customer)
                return Response(serializer.data)
            except UserProfile.DoesNotExist:
                return Response({'error': 'user details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            customers = UserProfile.objects.all()
            serializer = UserProfileSerializer(customers, many=True)
            return Response(serializer.data)
    
    def put(self, request, pk=None):
        if pk is not None:
            try:
                customer = UserProfile.objects.get(pk=pk)
                serializer = UserProfileSerializer(customer, data=request.data)
                if serializer.is_valid():
                     serializer.save()
                     return Response(serializer.data)
            except UserProfile.DoesNotExist:
                return Response({'error': 'user details not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid user ID.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                customer = UserProfile.objects.get(pk=pk)
                customer.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except UserProfile.DoesNotExist:
                return Response({'error': 'user details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid user ID.'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterUserView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    def post(self, request):
        if UserProfile.objects.filter(email=request.data['email']).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer



@method_decorator(csrf_exempt, name='dispatch')
class InvoiceView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def post(self, request):
        data = json.loads(request.body)
        customer_id = data['customer_id']
        purchase_order_number = data['purchase_order']
        vendor_code = data['vendor_code']
        invoice_date = data['invoice_date']
        invoice_number = data['invoice_number']

        customer = Customer.objects.get(pk=customer_id)

        new_invoice = NewInvoice.objects.create(
            customer_id=customer,
            purchase_order_number=purchase_order_number,
            vendor_code=vendor_code,
            invoice_date=invoice_date,
            invoice_no=invoice_number
        )

         # Extract and save product details
        product_details = data['product_details']
        for detail in product_details:
            purchase_id = detail['hsn_no']
            purchase_date = detail['purchase_date']
            no_of_units_allowed = detail['no_of_units']
            cost_per_unit = detail['product_cost']

            # Create and save product detail object
            product_details = ProductDetails(
                invoice_id=new_invoice,
                purchase_id=purchase_id,
                purchase_date=purchase_date,
                no_of_units_allowed=no_of_units_allowed,
                cost_per_unit=cost_per_unit
            )
            product_details.save()

        return JsonResponse({"message": "Invoice created successfully!"})
        
    def get(self, request):
        invoices = NewInvoice.objects.all()
        result = []
        for invoice in invoices:
            customer = invoice.customer_id
            obj = {
                "invoice_id": invoice.id,
                "client_name" : customer.id,
                "invoice_date" : invoice.invoice_date,
                "invoice_no" : invoice.invoice_no
            }
            result.append(obj)
        return JsonResponse({"data": result})
        '''data = NewInvoice.objects.all().count()
        today = datetime.datetime.now()
        year1 = today.year
        year = str(year1)
        year = year[2:]
        add  = int(data) + 1
        invoice_no_gen = "INV/{year}/{add}".format(add = add,year=year)

        data = Customer.objects.all().values('customer')
        product_data = Product.objects.all().values('product_name','hsn_no')
        result = {
            'invoice_no_gen': invoice_no_gen,
            'data':data,
            'product_data':product_data
                        }
        return JsonResponse({"data": result})'''
    def put(self, request, pk=None):
        if pk is not None:
            try:
                req_json = json.loads(request.body)
                invoice_data = NewInvoice.objects.get(pk=pk)
                for key, value in req_json.items():
                    if hasattr(invoice_data, key) and value is not None:
                        setattr(invoice_data, key, value)
                invoice_update.save()
            except NewInvoice.DoesNotExist:
                return Response({'error': 'invoice details not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid invoice ID.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                invoice = NewInvoice.objects.get(pk=pk)
                invoice.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except NewInvoice.DoesNotExist:
                return Response({'error': 'invoice details not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Please provide a valid invoice ID.'}, status=status.HTTP_400_BAD_REQUEST)
    

def get_admin_profile_details(user_id):
    try:
        admin_profile = AdminProfile.objects.get(user_id_id=user_id)
        return admin_profile
    except AdminProfile.DoesNotExist:
        return None


def get_new_invoice_details_by_customer(customer_id):
    try:
        new_invoice_details = NewInvoice.objects.filter(customer_id=customer_id)
        return new_invoice_details
    except NewInvoice.DoesNotExist:
        return None 

def get_customer_details(customer_id):
    try:
        customer_details = Customer.objects.get(id=customer_id)
        return customer_details
    except Customer.DoesNotExist:
        return None

@method_decorator(csrf_exempt, name='dispatch')
class InvoiceSlipView(APIView):
    permission_classes = (IsAuthenticated, ) 
    def get(self, request, user_id=None, invoice_id=None):
        if user_id == None:
            return Response({'error': 'admin id required.'}, status=status.HTTP_400_BAD_REQUEST)
        if invoice_id == None:
            return Response({'error': 'customer id required.'}, status=status.HTTP_400_BAD_REQUEST)

        admin_data = AdminProfile.objects.get(user_id_id=user_id)

        invoice_data = NewInvoice.objects.get(pk=invoice_id)

        customer_data = Customer.objects.get(pk=invoice_data.customer_id.id)

        db_product_details = ProductDetails.objects.filter(invoice_id=invoice_data.id)

        count = 1
        productdetails = []
        total = 0
        subtotal = 0
        for db_productdetail in db_product_details:
            no_of_units_allowed = db_productdetail.no_of_units_allowed
            cost_per_unit = db_productdetail.cost_per_unit
            amount = int(no_of_units_allowed) * int(cost_per_unit)

            # Calculate GST percentage
            gst_rate = 18  # Example GST rate
            gst_amount = round(amount * gst_rate / 100, 2)

            # Calculate total amount including GST
            total_amount = amount + gst_amount


            purchase_id = db_productdetail.purchase_id
            #product_name = db_productdetail.product_name
            productdetail = {
                'no_of_units_allowed': no_of_units_allowed,
                'cost_per_unit': cost_per_unit,
                'purchase_id': purchase_id,
                'amount': amount,
                'total_amount':total_amount,
                'gst_rate': gst_rate,
                #"product_name": product_name,
                'count':count
            }
            subtotal += total_amount
            total = total + total_amount
            productdetails.append(productdetail)
            count = count + 1

        from datetime import datetime, timedelta

       # Get the current date
        invoice_date = datetime.today().date()

        # Calculate the date after 40 days
        expiration_date = invoice_date + timedelta(days=40)


        sgst, cgst, igst = 0, 0, 0
        if customer_data.state == admin_data.state:
            sgst = 9
            cgst = 9
        elif len(customer_data.gst_number) == 0:
            igst = 0
        else:
            igst = 18

        sgst_amount = round(total * sgst / 100, 2)
        cgst_amount = round(total * cgst / 100, 2)
        igst_amount = round(total * igst / 100, 2)

        total = round(total + (total * sgst/100) + (total * cgst/100) + (total * igst/100),2)
        amount_in_words = num2words(total, lang='en').title()
        result = {
            'customer': customer_data.customer_id,
            'mail_id': customer_data.mail_id,
            'mobile_number': customer_data.mobile_number,
            'cos_gst_number': customer_data.gst_number,
            'state': customer_data.state,
            'customer_address': customer_data.address,
            'email': admin_data.mail_id,
            'address': admin_data.address,
            'phone_number': admin_data.phone_number,
            'bank_name': admin_data.bank_name,
            'bank_branch': admin_data.bank_branch,
            'gst_number': admin_data.gst_number,
            'pan_number': admin_data.pan_number,
            'account_number': admin_data.account_number,
            'ifsc_code': admin_data.ifsc_code,
            'company_name': admin_data.company_name,
            'invoice_date': invoice_data.invoice_date,
            'expiration_date': expiration_date,
            'invoice_no': invoice_data.invoice_no,
            'subtotal': subtotal,
            'sgst': sgst,
            'cgst': cgst,
            'igst': igst,
            'sgst_amount': sgst_amount,
            'cgst_amount': cgst_amount,
            'igst_amount': igst_amount,
            'total': total,
            'amount_in_words': amount_in_words,
            'state_code': customer_data.state_code,
            'productdetails': productdetails,
        }

        return JsonResponse({"data": result})


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)
    import uuid
    filename = str(uuid.uuid4()) + ".html"

    f = open(filename, 'w')
    f.write(html)
    #print(html)
    pdfkit.from_file(filename,'shaurya.pdf') 
    #result = BytesIO()
    #pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    #if pdf.err:
    #    return None
    #return result.getvalue()

@method_decorator(csrf_exempt, name='dispatch')
class SendInvoiceSlipView(APIView):
    #permission_classes = (IsAuthenticated, ) 
    def get(self, request, user_id=None, invoice_id=None):
        if user_id == None:
            return Response({'error': 'admin id required.'}, status=status.HTTP_400_BAD_REQUEST)
        if invoice_id == None:
            return Response({'error': 'customer id required.'}, status=status.HTTP_400_BAD_REQUEST)

        admin_data = AdminProfile.objects.get(user_id_id=user_id)

        invoice_data = NewInvoice.objects.get(pk=invoice_id)

        customer_data = Customer.objects.get(pk=invoice_data.customer_id.id)

        db_product_details = ProductDetails.objects.filter(invoice_id=invoice_data.id)

        count = 1
        productdetails = []
        total = 0
        subtotal = 0
        for db_productdetail in db_product_details:
            no_of_units_allowed = db_productdetail.no_of_units_allowed
            cost_per_unit = db_productdetail.cost_per_unit
            amount = int(no_of_units_allowed) * int(cost_per_unit)

            # Calculate GST percentage
            gst_rate = 18  # Example GST rate
            gst_amount = round(amount * gst_rate / 100, 2)

            # Calculate total amount including GST
            total_amount = amount + gst_amount


            purchase_id = db_productdetail.purchase_id
            #product_name = db_productdetail.product_name
            productdetail = {
                'no_of_units_allowed': no_of_units_allowed,
                'cost_per_unit': cost_per_unit,
                'purchase_id': purchase_id,
                'amount': amount,
                'total_amount':total_amount,
                'gst_rate': gst_rate,
                #"product_name": product_name,
                'count':count
            }
            subtotal += total_amount
            total = total + total_amount
            productdetails.append(productdetail)
            count = count + 1

        from datetime import datetime, timedelta

       # Get the current date
        invoice_date = datetime.today().date()

        # Calculate the date after 40 days
        expiration_date = invoice_date + timedelta(days=40)


        sgst, cgst, igst = 0, 0, 0
        if customer_data.state == admin_data.state:
            sgst = 9
            cgst = 9
        elif len(customer_data.gst_number) == 0:
            igst = 0
        else:
            igst = 18

        sgst_amount = round(total * sgst / 100, 2)
        cgst_amount = round(total * cgst / 100, 2)
        igst_amount = round(total * igst / 100, 2)

        total = round(total + (total * sgst/100) + (total * cgst/100) + (total * igst/100),2)
        amount_in_words = num2words(total, lang='en').title()
        result = {
            'customer': customer_data.customer_id,
            'mail_id': customer_data.mail_id,
            'mobile_number': customer_data.mobile_number,
            'cos_gst_number': customer_data.gst_number,
            'state': customer_data.state,
            'customer_address': customer_data.address,
            'email': admin_data.mail_id,
            'address': admin_data.address,
            'phone_number': admin_data.phone_number,
            'bank_name': admin_data.bank_name,
            'bank_branch': admin_data.bank_branch,
            'gst_number': admin_data.gst_number,
            'pan_number': admin_data.pan_number,
            'account_number': admin_data.account_number,
            'ifsc_code': admin_data.ifsc_code,
            'company_name': admin_data.company_name,
            'invoice_date': invoice_data.invoice_date,
            'expiration_date': expiration_date,
            'invoice_no': invoice_data.invoice_no,
            'subtotal': subtotal,
            'sgst': sgst,
            'cgst': cgst,
            'igst': igst,
            'sgst_amount': sgst_amount,
            'cgst_amount': cgst_amount,
            'igst_amount': igst_amount,
            'total': total,
            'amount_in_words': amount_in_words,
            'state_code': customer_data.state_code,
            'productdetails': productdetails,
        
        }
        template = get_template('invoiceslip.html')
        html_content = template.render(result)
        import uuid
        filename = str(uuid.uuid4())
        filename_pdf = filename + ".pdf"
        pdf_file_dir = './static/main/invoices/'
        css_file_path = './static/main/styless.css'
        Path(pdf_file_dir).mkdir(parents=True, exist_ok=True)
        pdf_file_path = pdf_file_dir + filename_pdf


        options = {
            'page-size': 'A3',
           # 'margin-top': '0mm',
           # 'margin-right': '0mm',
           # 'margin-bottom': '0mm',
           #'margin-left': '0mm',
        }
        pdfkit.from_string(html_content, pdf_file_path, options=options, css=css_file_path)

        subject = 'Email with Attachment'
        message = 'Please find the attached file.'
        from_email = settings.EMAIL_HOST_USER,
        #recipient_list = [customer_data.mail_id, "jafarbasha39@gmail.com"]
        recipient_list = [customer_data.mail_id]
        attachment_path = pdf_file_path

        send_email_with_attachment(subject, message, from_email, recipient_list, attachment_path)
        os.remove(attachment_path)

        '''subject, from_email, to = 'Message with pièce joint : N° 0001', 'jafarp@pathbreakertech.com', 'pavankumarr.pbt@gmail.com'
        text_content = 'hello'
        html_content = '<p>hello, .</p>'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.attach('commande_pdf',filename_pdf,'application/pdf')
        msg.send()'''
        return JsonResponse({"data": result})

