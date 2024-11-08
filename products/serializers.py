# ecommerce_project/products/serializers.py

from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['unique_id', 'title', 'price', 'description', 'specs', 'category', 'stock_status', 'url', 'image']
