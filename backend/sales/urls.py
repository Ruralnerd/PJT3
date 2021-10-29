from django.urls import path
from . import views

urlpatterns = [
    path('<int:market_pk>/request/', views.request_inquire_create),
    path('<int:market_pk>/request/<int:request_pk>/', views.request_management),
]