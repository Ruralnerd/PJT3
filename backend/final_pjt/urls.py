"""final_pjt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.permissions import AllowAny 
from drf_yasg.views import get_schema_view 
from drf_yasg import openapi

DEFAULT_URL = 'api/v1/'

schema_view = get_schema_view( 
    openapi.Info( 
        title="Open API", 
        default_version='v1', 
        description="시스템 API", 
        terms_of_service="https://www.google.com/policies/terms/", 
    ), 
    public=True, 
    permission_classes=(AllowAny,), 
)

urlpatterns = [
    path(DEFAULT_URL+'accounts/', include('accounts.urls')),
    path(DEFAULT_URL+'articles/', include('articles.urls')),
    path(DEFAULT_URL+'sales/', include('sales.urls')),
    path(DEFAULT_URL+'searches/', include('searches.urls')),
    path(DEFAULT_URL+'admin/', admin.site.urls),

    # Auto DRF API docs
    path('api/v1/swagger<str:format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/v1/docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


