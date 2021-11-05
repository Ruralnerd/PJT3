from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
    path('users/', views.signup),
    path('login/', obtain_jwt_token),
    path('kakao/login/', views.kakaologin),
    path('kakao/callback/', views.kakaologin_callback),
    path('users/<int:user_pk>/follow/', views.follow),
    path('users/<int:user_pk>/', views.update),
]
