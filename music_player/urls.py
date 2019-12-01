"""music_player URL Configuration

The `urlpatterns` drawerList routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import include, path

from player.views import IntroView

urlpatterns = [
    path('', IntroView.as_view(), name='intro'),
    path('admin/', admin.site.urls),
    # path('account', include('account.urls'), name='account'),
    path('api', include('api.urls'), name='api'),
    path('info', include('info.urls'), name='info'),
    path('player', include('player.urls'), name='player'),
]
