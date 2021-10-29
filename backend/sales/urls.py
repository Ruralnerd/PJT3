from django.urls import path
from . import views

urlpatterns = [
    path('<int:market_pk>/request', views.request_inquire_create),
]