from rest_framework import serializers
from .models import Profile,Skill,UserSkill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=["id","name"]

class ProfileSerializer(serializers.ModelSerializer):
    username=serializers.CharField(source="user.username",read_only=True)
    
    class Meta:
        model=Profile
        fields=["id","username","bio","avatar","github","location","linkedin","website","skills"]

class UserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserSkill
        fields=["id", "skill", "level"]

