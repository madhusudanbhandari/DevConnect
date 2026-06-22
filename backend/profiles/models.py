from django.db import models
from accounts.models import User
# Create your models here.


    
class Skill(models.Model):
    name=models.CharField(max_length=50,unique=True)

    def __str__(self):
        return self.name
    

class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    skills=models.ManyToManyField(Skill,blank=True)
    bio=models.TextField(blank=True)
    avatar=models.URLField(blank=True,null=True)

    location=models.CharField(max_length=100,blank=True)
    linkedin=models.URLField(blank=True)
    website=models.URLField(blank=True)
    github=models.URLField(blank=True)

    created_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user.username
    
class UserSkill(models.Model):
    LEVEL_CHOICES=[
        ("beginner","begineer"),
        ("intermediate","intermediate"),
        ("advanced","advanced")
    ]    
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="skills")
    skill=models.ForeignKey(Skill,on_delete=models.CASCADE)
    level=models.CharField(max_length=20,choices=LEVEL_CHOICES,default="begineer")

    class Meta:
        unique_together=("user","skill")

    def __str__(self):
        return f"{self.user}-{self.skill} ({self.level})"

