from rest_framework.routers import DefaultRouter
from .views import CommentViewSet, ProductChatView

router = DefaultRouter()
router.register(r'', CommentViewSet, basename='comment')

urlpatterns = router.urls

from django.urls import path


urlpatterns = [
    path('', CommentViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('product-chat/<int:product_id>/', ProductChatView.as_view(), name='product_chat'),
]
