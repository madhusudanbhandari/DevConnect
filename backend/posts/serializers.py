from .models import Posts,Like,Comment,Repost
from rest_framework import serializers

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        fields=["user","post","photo","location","tag"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Like
        fields=['id','user','post']
        read_only_fields=['user']
    


class CommentSerializer(serializers.ModelSerializer):
    username=serializers.CharField(source="user.username",read_only=True)
    class Meta:
        model=Comment
        fields=["id","user","username","post","content"]
        read_only_fields=['user']


class RepostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Repost
        fields=["id","user","post"]
        read_only_fields=["user"]

        