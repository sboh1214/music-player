from django.urls import path

from player.views import *

app_name = 'player'

urlpatterns = [
    path('', SPAView.as_view(), {'view': 'songs'}, name='spa'),

    path('/add', SPAView.as_view(view='add'), {'view': 'add'}, name='add'),
    path('/artists', SPAView.as_view(view='artists'), {'view': 'artists'}, name='artists'),
    path('/albums', SPAView.as_view(view='albums'), {'view': 'albums'}, name='albums'),
    path('/songs', SPAView.as_view(view='songs'), {'view': 'songs'}, name='songs'),
    path('/account', SPAView.as_view(view='account'), {'view': 'account'}, name='account'),
    path('/settings', SPAView.as_view(view='settings'), {'view': 'settings'}, name='settings'),

    path('/add/view', AddView.as_view(), name='add_view'),
    path('/artists/view', ArtistsView.as_view(), name='artists_view'),
    path('/albums/view', AlbumsView.as_view(), name='albums_view'),
    path('/songs/view', SongsView.as_view(), name='songs_view'),
    path('/account/view', AccountView.as_view(), name='account_view'),
    path('/settings/view', SettingsView.as_view(), name='settings_view'),

    path('/songs/list', songs_list, name='songs_list'),
]
