from rest_framework import generics
from .serializers import RegisterSerializer
from .models import User
from rest_framework.permissions import AllowAny

# Create your views here.

class RegisterView(generics.CreateAPIView):
    query=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]


