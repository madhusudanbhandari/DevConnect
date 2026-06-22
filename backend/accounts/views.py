from rest_framework import generics
from .serializers import RegisterSerializer,UserSerializer
from .models import User
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]


class UserView(APIView):
    permission_classes=[IsAuthenticated]


    def get(self,request):
        serializer=UserSerializer(request.user)
        return Response(serializer.data)