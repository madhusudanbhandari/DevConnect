from django.urls import path
from .views import DashboardView

urlpatterns=[
    path("dash/",DashboardView.as_view(), name="Dashboard"),
    
]