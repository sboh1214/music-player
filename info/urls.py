from django.urls import path

from api.views import *

app_name = 'info'

urlpatterns = [
    path('<slug:artist>/', artist, name='artist'),
    path('<slug:artist>/<slug:album>/', album, name='album'),
    path('<slug:artist>/<slug:album>/<slug:song>/', song, name='song'),
    
]
