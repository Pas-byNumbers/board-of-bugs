from rest_framework.routers import SimpleRouter
from .views import UserViewSet, RegisterViewSet, LoginViewSet, RefreshViewSet


router = SimpleRouter()

router.register(r'register', RegisterViewSet, basename='accounts-register')
router.register(r'login', LoginViewSet, basename='accounts-login')
router.register(r'refresh', RefreshViewSet, basename='accounts-refresh')
router.register(r'users', UserViewSet, basename='accounts-users')

urlpatterns = [
    *router.urls
]


"""
urlpatterns = [
    path('', include(router.urls))
]
"""
