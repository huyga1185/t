# models.p

from django.db import models
from django.utils import timezone

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='playlist_images/', default='/static/images/default-playlist.png')
    created_at = models.DateTimeField(default=timezone.now)  # Chỉ định giá trị mặc định là thời gian hiện tại
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

# Mô hình Song
class Song(models.Model):
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to='songs/', default='songs/default.mp3')
    playlist = models.ForeignKey('Playlist', on_delete=models.CASCADE)
    plays = models.IntegerField(default=0)  # Thêm trường plays

    def __str__(self):
        return self.name


   

# Mô hình Album
class Album(models.Model):
    name = models.CharField(max_length=255)
    cover_image = models.ImageField(upload_to='album_images/', default='/static/images/default-song.png')
    release_date = models.DateField()

    def __str__(self):
        return self.name

