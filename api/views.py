from rest_framework import viewsets
from .models import Project, Bug
from .serializers import ProjectSerializer, BugSerializer

# Create your views here.
class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    
class BugViewSet(viewsets.ModelViewSet):
    serializer_class = BugSerializer
    queryset = Bug.objects.all()