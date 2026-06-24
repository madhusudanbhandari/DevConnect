from django.urls import path
from .views import PostsView,LikePostView,CommentPostView,RepostPostView,CommentListView

urlpatterns=[
    path("posts/", PostsView.as_view()),
    path("posts/<int:pk>/like/",LikePostView.as_view()),
    path("posts/<int:pk>/comment",CommentPostView.as_view()),
    path("post/<int:pk>/comments/", CommentListView.as_view()),
    path("posts/<int:pk>/repost/",RepostPostView.as_view()),
]