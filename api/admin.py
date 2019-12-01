from django.contrib.admin import ModelAdmin, site

from api.models import *


class ArtistAdmin(ModelAdmin):
    pass


class AlbumAdmin(ModelAdmin):
    pass


class SongAdmin(ModelAdmin):
    list_display = ('name', 'album')
    search_fields = ('name', 'album')


site.register(Artist, ArtistAdmin)
site.register(Album, AlbumAdmin)
site.register(Song, SongAdmin)
