from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Recommendation

class RecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Placeholder for recommendation logic
        user = request.user
        # Content-based and collaborative filtering logic goes here
        recommendations = []  # Populate with recommendation logic
        return Response({"recommendations": recommendations})



import numpy as np
from annoy import AnnoyIndex
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from products.models import Product
from .serializers import ProductSerializer
import openai
import os 

openai.api_key = os.getenv('OPENAI_API_KEY')

class SearchProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        query_text = request.data.get("query_text", "")
        image_embedding = request.data.get("image_embedding", None)  # Expect precomputed embedding from frontend

        if image_embedding:
            # Image-based search with Annoy
            image_vector = np.array(image_embedding, dtype=np.float32)
            index = AnnoyIndex(len(image_vector), 'angular')
            index.load('image_vectors.ann')  # Load precomputed Annoy index file

            similar_product_ids = index.get_nns_by_vector(image_vector, 5)  # Find top 5 matches
            similar_products = Product.objects.filter(id__in=similar_product_ids)
        elif query_text:
            # Text-based search using simple filter
            similar_products = Product.objects.filter(title__icontains=query_text)[:5]
        else:
            return Response({"error": "Provide either a text query or an image embedding."}, status=400)

        # Serialize and return matched products
        serializer = ProductSerializer(similar_products, many=True)
        return Response(serializer.data)
