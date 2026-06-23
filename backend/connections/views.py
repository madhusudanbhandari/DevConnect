from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Connection
from django.db import models

# Create your views here.

class SendConnectionView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        to_user_id=request.data.get("to_user")

        if Connection.objects.filter(
            from_user=request.user,
            to_user=to_user_id
        ).exists():
            return Response({"message":"Request alredy sent"},status=400)
        
        Connection.objects.create(
            from_user=request.user,
            to_user_id=to_user_id
        )

        return Response({"message":"Request sent"})
    


class RespondConnectionRequest(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request,pk):
        action=request.data.get("action")

        try:
            conn=Connection.objects.get(id=pk,to_user=request.user)
        except Connection.DoesNotExist:
            return Response({"message":"Not found"},status=404)
        
        if action=="accept":
            conn.status="accepted"
        elif action=="rejected":
            conn.status="rejected"

        conn.save()
        return Response({"message":f"Request {action}ed"})
    

class MyConnectionsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        connections=Connection.objects.filter(
            status="accepted"
        ).filter(
            models.Q(from_user=request.user) | models.Q(to_user=request.user)
        )

        data=[]
        for c in connections:
            other_user=c.to_user if c.from_user==request.user else c.from_user
            data.append({
                "id":other_user.id,
                "username":other_user.username
            })
        return Response(data)