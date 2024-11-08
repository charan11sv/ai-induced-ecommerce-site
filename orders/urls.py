from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'', OrderViewSet, basename='order')

urlpatterns = router.urls


from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, BookmarkViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'bookmarks', BookmarkViewSet, basename='bookmark')

urlpatterns = router.urls
