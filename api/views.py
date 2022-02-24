from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Project, Bug
from .serializers import ProjectSerializer, BugSerializer

# Create your views here.
class ProjectViewSet(ModelViewSet):
    # queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated, )
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id']
    ordering = ['-id']
    
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(user=user)
    
class BugViewSet(ModelViewSet):
    # queryset = Bug.objects.all()
    serializer_class = BugSerializer
    permission_classes = (IsAuthenticated, )
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id']
    ordering = ['-id']
    
    def get_queryset(self):
        user = self.request.user
        return Bug.objects.filter(project__user=user)