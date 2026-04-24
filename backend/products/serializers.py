from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = [
            'product_id', 'name', 'description', 'price', 
            'photo','image_url', 'quantity', 'category', 'discount', 
            'created_at', 'updated_at'
        ]
