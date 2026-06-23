from django.urls import path
from .views import SendConnectionView,RespondConnectionRequest,MyConnectionsView


urlpatterns=[
    path("send-request/",SendConnectionView.as_view()),
    path("respond-request/",RespondConnectionRequest.as_view()),
    path("my-connection/" ,MyConnectionsView.as_view()),
]

