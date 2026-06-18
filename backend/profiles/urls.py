from django.urls import path
from .views import RegisterView

urlpatters=[
    path("register/" ,RegisterView.as_view(),name="Register View" )
    
]