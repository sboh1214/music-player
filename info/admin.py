from django.contrib import admin

from .models import artist, album, song

admin.site.register(artist)
admin.site.register(album)
admin.site.register(song)
