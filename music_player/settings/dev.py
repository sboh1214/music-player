from music_player.settings.base import *

SETTINGS = 'dev'

SECRET_KEY = '#j+l+vvx_(3w#soxc!i$foz+(ba=uyk+sysl79y$x(90d1a!#a'

DEBUG = True

ALLOWED_HOSTS = ['*']

WSGI_APPLICATION = 'music_player.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME'  : join(BASE_DIR, 'db.sqlite3'),
    }
}
