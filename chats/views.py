from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Comment
from .serializers import CommentSerializer



class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            # Admin can see all comments
            return Comment.objects.all()
        # Users can only see their own comments
        return Comment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user and product for the comment
        serializer.save(user=self.request.user)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from products.models import Product
import openai

class ProductChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        question = request.data.get("question", "")
        if not question:
            return Response({"error": "Question cannot be empty."}, status=400)

        try:
            # Fetch product information
            product = Product.objects.get(id=product_id)
            prompt = f"Answer the question based on the following product details:\nTitle: {product.title}\nDescription: {product.description}\n\nQuestion: {question}"

            # LLM response using OpenAI
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=prompt,
                max_tokens=150
            )
            answer = response.choices[0].text.strip()

            return Response({"answer": answer})
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
