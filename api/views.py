from rest_framework.viewsets import ModelViewSet
from .models import Project, Bug
from .serializers import ProjectSerializer, BugSerializer

# Create your views here.
class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    
class BugViewSet(ModelViewSet):
    serializer_class = BugSerializer
    queryset = Bug.objects.all()