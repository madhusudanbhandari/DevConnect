from rest_framework import serializers
from .models import Profile,UserSkill


class UserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserSkill
        fields=["id", "skill", "level"]


class ProfileSerializer(serializers.ModelSerializer):
    username=serializers.CharField(source="user.username",read_only=True)
    skills=UserSkillSerializer(source="user.skills",many=True,read_only=True)
    

    class Meta:
        model=Profile
        fields=["id","username","bio","avatar","github","location","linkedin","website","skills"]

    
        


