from rest_framework import serializers
from .models import Connection

class ConnectionSerializer(serializers.ModelSerializer):
    from_username=serializers.CharField(source="from_user.username",read_only=True)
    to_user=serializers.CharField(source="to_user.username",read_only=True)
    

    class Meta:
        model=Connection
        fields=["id","from_user","to_user","from_username","to_username"]