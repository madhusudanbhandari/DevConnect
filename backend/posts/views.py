from rest_framework.views import APIView
from .serializers import PostsSerializer,CommentSerializer
from rest_framework.response import Response
from .models import Like,Comment,Repost,Posts
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class PostsView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=PostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"Message":"Post created"})

        return Response(serializer.errors)


class LikePostView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request,pk):
        like,created=Like.objects.get_or_create(
            user=request.user,
            post_id=pk
        )

        if not created:
            like.delete()
            return Response({"message":"Post Unliked"})
        return Response({"message":"Post liked"})


class CommentPostView(APIView):
    permission_classes=[IsAuthenticated]

    def post(seld,request,pk):
        serializer=CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user,post_id=pk)
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)

class CommentListView(APIView):
    def get(self,request,pk):
        comments=Comment.objects.filter(post_id=pk).order_by("-created_at")
        serializer=CommentSerializer(comments,many=True)
        return Response(serializer.data)


class RepostPostView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request,pk):
        repost,created=Repost.objects.get_or_create(
            user=request.user,
            post_id=pk
        )

        if not created:
            repost.delete()
            return Response({"message":"Cant repost"})
        return Response({"message":"Reposted successfully"})
    