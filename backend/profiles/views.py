from .models import Profile,UserSkill
from .serializers import ProfileSerializer,UserSkillSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics,permissions
from rest_framework.exceptions import ValidationError
from django.db.models import Q

class ProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        profile=request.user.profile
        serializer=ProfileSerializer(profile)
        return Response(serializer.data)
    
    def put(self,request):
        profile=request.user.profile
        serializer=ProfileSerializer(profile,data=request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)
    


class AddUserSkillView(generics.CreateAPIView):
    serializer_class=UserSkillSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self,serializer):
        skill=serializer.validated_data["skill"]

        if UserSkill.objects.filter(
            user=self.request.user,
            skill=skill
        ).exists():
            raise ValidationError({
                "skill":["This skill already exist."]
            })

        serializer.save(user=self.request.user)


class MySkillsView(generics.ListAPIView):
    serializer_class=UserSkillSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return UserSkill.objects.filter(user=self.request.user)
    


class FindDeveloperView(generics.ListAPIView):
    serializer_class=ProfileSerializer

    def get_queryset(self):
        query=self.request.query_params.get("search","")

        return Profile.objects.filter(
            Q(user__username__icontains=query) |
            Q(user__skills__skill__icontains=query)
        # ).exclude(user=self.request.user
        ).distinct()