from django.urls import path
from . import views

urlpatterns = [
    path('markets/', views.markets),
    path('markets/<int:market_pk>/', views.market_detail),
    path('markets/<int:market_pk>/categorys/', views.market_categorys),
    path('markets/<int:market_pk>/img/', views.market_img),
    # path('markets/<int:market_pk>/img/<int:img_pk>/', views.market_img_delete),
    path('markets/<int:market_pk>/comments/', views.comment),
    path('markets/<int:market_pk>/comments/<comment_pk>/', views.comment_delete),
    path('markets/<int:market_pk>/request/', views.market_request),
    path('markets/<int:market_pk>/request/<int:request_pk>/', views.request_management),
    path('markets/<int:market_pk>/request/<int:request_pk>/approval/', views.request_approval),
    path('markets/<int:market_pk>/request/<int:request_pk>/cancel/', views.request_cancel),
]