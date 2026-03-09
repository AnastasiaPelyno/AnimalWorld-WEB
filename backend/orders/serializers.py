# serializers.py
from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity', 'product_price', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='order_items', many=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    status = serializers.CharField()

    class Meta:
        model = Order
        fields = ['order_id', 'total_price', 'status', 'items']
