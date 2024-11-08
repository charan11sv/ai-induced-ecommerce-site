# ecommerce_project/products/models.py

from django.db import models

class Product(models.Model):
    unique_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    specs = models.TextField()
    category = models.CharField(max_length=100)
    stock_status = models.CharField(max_length=50)
    # ecommerce_project/products/models.py
    url = models.URLField(max_length=500, default='')

    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.title
