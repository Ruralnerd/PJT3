from django.urls import path
from . import views

urlpatterns = [
    path('<int:market_pk>/request/', views.market_request),
    path('<int:market_pk>/request/<int:request_pk>/', views.request_management),
    path('<int:market_pk>/request/<int:request_pk>/approval', views.request_approval),

]