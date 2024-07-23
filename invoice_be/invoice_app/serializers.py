from rest_framework import serializers
from .models import Customer, Product, InvoicePayments, AdminProfile, NewInvoice, ProductDetails, UserProfile
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class InwardPaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoicePayments
        fields = '__all__'


class AdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminProfile
        fields = '__all__'


class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = '__all__'


class NewInvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewInvoice
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = '__all__'
        extra_kwargs = {'customer_id': {'required': False},'gst_number': {'required': False}}

class UserProfileSerializer(serializers.ModelSerializer):
    admin_profile_details = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'user': self.user.role})
        data.update({'id': self.user.id})
        return data
