from rest_framework import serializers
from .models import Review
from products.models import Product
from users.models import User

class ProductSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'name']  

class UserSerializer1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']  

class ReviewSerializer(serializers.ModelSerializer):
    
    product = ProductSerializer1(read_only=True)
    user = UserSerializer1(read_only=True)

    class Meta:
        model = Review
        fields = ['user', 'product', 'rating', 'comment', 'created_at']
