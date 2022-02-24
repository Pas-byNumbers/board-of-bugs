from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
# Create your views here.

User = get_user_model()
class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ['get']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id']
    ordering = ['-id']
    
    def get_queryset(self):
        user =self.request.user
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(username=user.username)
    """
    def get_object(self):
        obj = get_object_or_404(User.objects.filter(id=self.kwargs["pk"]))
        self.check_object_permissions(self.request, obj)
        return obj
    """

class RegisterViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }

        return Response(
            {
                "user": serializer.data,
                "refresh": res["refresh"],
                "token": res["access"]
            },
            status=status.HTTP_201_CREATED
        )


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )
    http_method_names = ['post']

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as error:
            raise InvalidToken(error.args[0])

        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK
        )

class RefreshViewSet(ViewSet, TokenRefreshView):
    permission_classes = [AllowAny,]
    http_method_names = ['post']
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as error:
            raise InvalidToken(error.args[0])
        
        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK
        )