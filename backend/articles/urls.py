from django.urls import path
from . import views

urlpatterns = [
    path('storys/', views.storys),
    path('storys/<int:story_pk>/', views.story_detail),
    path('storys/<int:story_pk>/categorys/', views.story_categorys),
    path('storys/<int:story_pk>/img/', views.story_img),
    path('storys/<int:story_pk>/img/<int:img_pk>/', views.story_img_delete),
    path('storys/<int:story_pk>/comments/', views.comment),
    path('storys/<int:story_pk>/comments/<comment_pk>/', views.comment_delete),
]