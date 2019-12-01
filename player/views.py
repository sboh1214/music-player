from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse_lazy
from django.utils.text import slugify
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from django.views.generic.list import ListView

from api.models import *
from player.forms import *


class IntroView(TemplateView):
    template_name = 'intro.html'


class SPAView(TemplateView, LoginRequiredMixin):
    template_name = 'spa.html'
    login_url = '/account/login'
    view = 'songs'


def unique_slugify(model, name):
    slug = slugify(name, allow_unicode=True)[:18]
    i = 1
    while True:
        i += 1
        try:
            model.objects.get(slug=slug)
            slug = slug[:18] + str(i)
        except ObjectDoesNotExist:
            break
    return slug


class AddView(FormView):
    template_name = 'pages/add.html'
    form_class = MultiFileForm
    success_url = reverse_lazy('player:spa')

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('file_field')
        if form.is_valid():
            for file in files:
                info = Song.get_audio_info(file.temporary_file_path())
                artist, is_artist_created = Artist.objects.get_or_create(slug=slugify(info['artist']),
                                                                         name=info['artist'])
                album, is_album_created = Album.objects.get_or_create(slug=slugify(info['album']),
                                                                      name=info['album'], artist=artist)
                album.artist = artist
                song = Song.objects.create(slug=unique_slugify(Song, info['title']),
                                           name=info['title'], album=album, audio=file)
                song.user.add(request.user)
            return self.form_valid(form)
        else:
            return self.form_invalid(form)


class ArtistsView(ListView):
    template_name = "pages/artists.html"
    model = Artist
    context_object_name = 'artist_list'

    def get_queryset(self):
        return Artist.objects.filter(artist__album__user=self.request.user)


class AlbumsView(ListView):
    template_name = "pages/albums.html"
    model = Album
    context_object_name = 'album_list'

    def get_queryset(self):
        return Album.objects.filter(album__user=self.request.user)


class SongsView(ListView):
    template_name = 'pages/songs.html'
    model = Song
    context_object_name = 'song_list'

    def get_queryset(self):
        return Song.objects.filter(user=self.request.user)

    
class AccountView(TemplateView):
    template_name = "pages/account.html"


class SettingsView(TemplateView):
    template_name = "pages/settings.html"
