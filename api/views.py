from json import dumps
from django.http import HttpResponse

from .models import *


def artist(response, artist):
    pass


def album(response, album):
    pass


def song(response, song):
    data = dumps({"slug"      : song.slug,
                  "name"      : song.name,
                  "albumName" : song.album.name,
                  "artistName": song.album.artist.name,
                  "audioUrl"  : song.audio.url})
    return HttpResponse(data)
