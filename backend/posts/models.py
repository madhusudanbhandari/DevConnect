from django.db import models
from accounts.models import User
# Create your models here.

class Posts(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="post_by_user")

    post=models.TextField(max_length=1000,null=True)
    photo=models.ImageField(upload_to="posts/",blank=True ,null=True)
    location=models.TextField(max_length=50)

    tag=models.ManyToManyField(User,related_name="tagged_people")

    created_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username}-{self.created_at}"


class Like(models.Model):
    post=models.ForeignKey(Posts,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)

    class Meta:
        unique_together=("user","post")

class Comment(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post=models.ForeignKey(Posts,on_delete=models.CASCADE)

    content=models.TextField()

    created_at=models.DateTimeField(auto_now_add=True)


class Repost(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    posts=models.ForeignKey(Posts,on_delete=models.CASCADE)
