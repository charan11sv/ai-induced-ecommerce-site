
from django.urls import path
from .views import RecommendationView, SearchProductView

urlpatterns = [
    path('', RecommendationView.as_view(), name='recommendations'),
    path('search/', SearchProductView.as_view(), name='search_products'),
]
