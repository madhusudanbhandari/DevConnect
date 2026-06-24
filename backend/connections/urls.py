from django.urls import path
from .views import SendConnectionView,RespondConnectionRequest,MyConnectionsView,PendingRequests


urlpatterns=[
    path("send-request/",SendConnectionView.as_view()),
    path("respond-requests/<int:pk>/",RespondConnectionRequest.as_view()),
    path("my-connections/" ,MyConnectionsView.as_view()),
    path("requests/", PendingRequests.as_view()),
]

