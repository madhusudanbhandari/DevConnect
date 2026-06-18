from .models import Profile,UserSkill
from .serializers import ProfileSerializer,UserSkillSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics,permissions

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
        serializer.save(user=self.request.user)


class MySkillsView(generics.ListAPIView):
    serializer_class=UserSkillSerializer
    permission_classes=[IsAuthenticated]

    def generate_queryset(self):
        return UserSkill.objects.filter(user=self.request.user)