from django.db import models



class artist(models.Model):
    artist_name = models.CharField(max_length = 100)

    def __str__(self):
   
        return "이름 : " + self.artist_name

class album(models.Model):
    album_name = models.CharField(max_length = 100)

    def __str__(self):
      
        return "이름 : " + self.album_name
    
class song(models.Model):
    song_name = models.CharField(max_length = 100)

    def __str__(self):
   
        return "이름 : " + self.song_name