from rest_framework import serializers
from .models import Project, Bug

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'id', 
            'name', 
            'context', 
            'cycle', 
            'status', 
            'version'
        )

class BugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bug
        fields = (
            'id',
            'found_by',
            'error_details',
            'output',
            'severity',
            'fix',
            'open_datetime',
            'close_datatime',
            'is_resolved',
            'project'
        )