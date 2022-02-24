from django.db import models
from django.conf import settings
# from django.utils import timezone
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=200)
    context = models.CharField(max_length=200)
    cycle = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    version = models.FloatField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        on_delete=models.CASCADE
        )
    
    
    def __str__(self):
        return self.name


class Bug(models.Model):
    found_by = models.CharField(max_length=200)
    error_details = models.CharField(max_length=200)
    output = models.TextField(blank=True)
    severity = models.CharField(max_length=200)
    fix = models.CharField(max_length=200, blank=True)
    open_datetime = models.DateTimeField(null=False, blank=False)
    close_datetime = models.DateTimeField(null=True, blank=True, default=None)
    is_resolved= models.BooleanField(default=False)
    project = models.ForeignKey(
        Project,
        null=False,
        on_delete=models.CASCADE
        )
    
    def __str__(self):
        return f"{self.project.name} - {self.open_datetime}: {self.error_details}"
