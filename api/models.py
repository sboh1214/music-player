from django.contrib.auth.models import User
from django.db import models

from mutagen.flac import FLAC
from mutagen.id3 import ID3, APIC
from mutagen.easyid3 import EasyID3
from mutagen.mp4 import MP4
from mutagen import File


class Artist(models.Model):
    slug = models.SlugField(max_length=20, unique=True, allow_unicode=True, auto_created=True)
    name = models.TextField()

    def __str__(self):
        return self.name


class Album(models.Model):
    slug = models.SlugField(max_length=20, unique=True, allow_unicode=True, auto_created=True)
    name = models.TextField()
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='artist')
    published_date = models.DateField(null=True)
    cover = models.ImageField(null=True)

    def __str__(self):
        return self.name


class Song(models.Model):
    slug = models.SlugField(max_length=20, unique=True, allow_unicode=True)
    name = models.TextField()
    minutes = models.IntegerField(default=0, null=True)
    seconds = models.IntegerField(default=0, null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='album', )
    audio = models.FileField()
    user = models.ManyToManyField(User)

    def __str__(self):
        return self.name

    def __repr__(self):
        return f"{self.user} - {self.name} ({self.slug})"

    @staticmethod
    def get_audio_info(path):
        ext = path.split('.')[-1]
        info = {'album': None, 'title': None, 'artist': None, 'date': None, 'covr':None}
        if ext == 'mp3':
            music = EasyID3(path)
            info['album'] = music['album']
            info['artist'] = music['artist']
            info['title'] = music['title']
            info['date'] = music['date']
            music = File(path)
            imgkey=None
            for key in music.keys():
                if key[0:4] == 'APIC':
                    imgkey=key
            if imgkey!=None:
                info['covr'] = music.tags[imgkey].data # access APIC frame and grab the image
        elif ext == 'flac':
            music = FLAC(path)
            info['album'] = music['album'][0]
            info['artist'] = music['artist'][0]
            info['title'] = music['title'][0]
            info['date'] = music['date'][0]
        elif ext == 'm4a':
            music = MP4(path)
            info['album'] = music['©alb'][0]
            info['artist'] = music['©ART'][0]
            info['title'] = music['©nam'][0]
            info['date'] = music['©day'][0]
        else:
            raise TypeError()

        return info
