SETTINGS = 'prod'

SECRET_KEY = '#j+l+vvx_(3w#soxc!i$foz+(ba=uyk+sysl79y$x(90d1a!#a'

DEBUG = False

ALLOWED_HOSTS = [
    '*',
    # 'music.sboh.me',
]

WSGI_APPLICATION = 'music_player.wsgi.prod.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME'  : 'postgres',
        'USER'  : 'postgres',
        'HOST'  : 'db',
        'PORT'  : 5432,
    }
}
