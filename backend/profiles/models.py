from django.db import models
from accounts.models import User
# Create your models here.


    
class Skill(models.Model):
    name=models.CharField(max_length=50,unique=True)

    def __str__(self):
        return self.name
    

class DeveloperProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    skills=models.ManyToManyField(Skill,blank=True)
    bio=models.TextField(blank=True)
    avatar=models.ImageField(upload_to="avatars/",blank=True,null=True)

    location=models.CharField(max_length=100,blank=True)
    linkedin=models.URLField(blank=True)
    website=models.URLField(blank=True)
    github=models.URLField(blank=True)

    created_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.username
    


