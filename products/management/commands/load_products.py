# ecommerce_project/products/management/commands/load_products.py

import os
import json
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from products.models import Product

class Command(BaseCommand):
    help = 'Load products from JSON file into the database'

    def handle(self, *args, **options):
        json_file_path = os.path.join(settings.BASE_DIR, 'formatted_product_data.json')
        image_dir = os.path.join(settings.BASE_DIR, 'downloaded_images')

        with open(json_file_path, 'r', encoding='utf-8') as f:
            products_data = json.load(f)

        for product_data in products_data:
            unique_id = product_data['unique_id']
            image_path = os.path.join(image_dir, f"{unique_id}.jpg")

            # Handle price conversion with error checking
            price_str = product_data['price'].replace(",", "")
            try:
                price = float(price_str) if price_str and price_str != '.' else 0.0  # Default to 0.0 if invalid
            except ValueError:
                price = 0.0  # Fallback value

            # Create the Product instance
            product, created = Product.objects.get_or_create(
                unique_id=unique_id,
                defaults={
                    'title': product_data['title'],
                    'price': price,
                    'description': product_data['description'],
                    'specs': product_data['specs'],
                    'category': product_data['category'],
                    'stock_status': product_data['stock_status'],
                    'url': product_data['url'],
                }
            )

            # Add the image if it exists
            if created and os.path.exists(image_path):
                with open(image_path, 'rb') as img_file:
                    product.image.save(f"{unique_id}.jpg", File(img_file), save=True)

        self.stdout.write(self.style.SUCCESS('Products loaded successfully'))
