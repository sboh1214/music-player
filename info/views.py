from django.views.generic.base import TemplateView
from django.urls import reverse_lazy
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView


class ArtistView(TemplateView):
    template_name = 'info/artist.html'
    context_object_name = 'artist_list'
    model = artist


class ArtistListView(ListView):
    model = artist


class AlbumView(TemplateView):
    template_name = 'info/album.html'
    context_object_name = 'album_list'
    model = album


class AlbumListView(ListView):
    model = album


class SongView(TemplateView):
    template_name = 'info/song.html'
    context_object_name = 'song_list'
    model = song


class SongListView(ListView):
    model = song


class SongCreateView(CreateView):
    model = song
    fields = ['song_name']
    success_url = reverse_lazy('list')
    template_name_suffix = '_create'


class SongUpdateView(UpdateView):
    model = song
    fields = ['song_name']
    success_url = reverse_lazy('list')
    template_name_suffix = '_update'


class SongDeleteView(DeleteView):
    model = song
    success_url = reverse_lazy('list')
    template_name_suffix = '_delete'
