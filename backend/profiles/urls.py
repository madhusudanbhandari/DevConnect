from django.urls import path
from .views import ProfileView,AddUserSkillView,MySkillsView,FindDeveloperView

urlpatterns = [
    path("profile/", ProfileView.as_view()),
    path("skills/add/",AddUserSkillView.as_view()),
    path("skills/",MySkillsView.as_view()),
    path("find/",FindDeveloperView.as_view())
    
]