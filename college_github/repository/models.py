from django.db import models
from django.conf import settings

class Repository(models.Model):
    # Basic Repository Details
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Repository Ownership and Collaborators
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='repositories')
    collaborators = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='collaborations', blank=True)

    # Repository Settings
    is_private = models.BooleanField(default=False)
    has_issues = models.BooleanField(default=True)
    has_projects = models.BooleanField(default=True)
    has_wiki = models.BooleanField(default=True)

    # Repository Stats
    star_count = models.PositiveIntegerField(default=0)
    fork_count = models.PositiveIntegerField(default=0)
    
    # Add more fields as required...

    def __str__(self):
        return self.name
