from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class DashboardView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user
        profile=user.profile

        data={
            "user":{
                "username":user.username,
                "email":user.email,
                "role":getattr(user,"role",None),
            },
            "profile":{
                "bio":profile.bio,
                "location":getattr(profile,"location",""),
                "avatar":profile.avatar if profile.avatar else None,
                "profile_completion":0
            },
            "stats":{
                "connections":0,
                "projects":0
            },
            "suggested_developers":[]
        }

        return Response(data)