from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES=[
        ("developer",'Developer'),
        ("recruited",'Recruiter'),
        ("admin",'admin'),
    ]

  
    email=models.EmailField(unique=True)
    is_verified=models.BooleanField(default=False)
    role=models.CharField(choices=ROLE_CHOICES,max_length=30,default="developer")

    def __str__(self):
        return self.username