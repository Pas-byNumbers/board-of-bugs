from django.db import models

# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=200)
    context = models.CharField(max_length=200)
    cycle = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name


class Bug(models.Model):
    found_by = models.CharField(max_length=200)
    error_details = models.CharField(max_length=200)
    output = models.TextField
    severity = models.CharField(max_length=200)
    fix = models.CharField(max_length=200)
    open_datetime = models.DateTimeField()
    close_datetime = models.DateTimeField()
    project = models.ForeignKey(
        Project,
        null=False,
        on_delete=models.CASCADE
        )
    
    def __str__(self):
        return f"{self.project.name} - {self.open_datetime}: {self.error_details}"
