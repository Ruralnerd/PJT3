from django.urls import path
from . import views

urlpatterns = [
    path('categorys/', views.categorys),
    path('categorys/storys/', views.storys),
    path('categorys/markets/', views.markets),
]