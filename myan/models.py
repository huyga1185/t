from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Artist(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='spotify_clone_1990', default='/static/images/default-playlist.png')

    def __str__(self) -> str:
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='spotify_clone_1990/', default='/static/images/default-playlist.png')
    created_at = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1, null=True, blank=True)  # Quan hệ với User

    def __str__(self):
        return self.name

class Song(models.Model):
    name = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, null=True, blank=True)  # Quan hệ với Artist
    audio_file = models.FileField(upload_to='spotify_clone_1990/')
    release_date = models.DateField(null=True)
    cover_image = models.ImageField(upload_to='spotify_clone_1990/', default='/static/images/default-song.png')  # Ảnh của bài hát
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True)  # Quan hệ với Genre
    playlists = models.ManyToManyField(Playlist, related_name='songs', blank=True)  # Quan hệ nhiều - nhiều với Playlist

    def __str__(self):
        return self.name

class Album(models.Model):
    name = models.CharField(max_length=255)
    cover_image = models.ImageField(upload_to='spotify_clone_1990/', default='/static/images/default-album.png')
    release_date = models.DateField()
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, null=True, blank=True)  # Quan hệ với Artist
    songs = models.ManyToManyField(Song, related_name='albums', blank=True)  # Quan hệ nhiều - nhiều với Song

    def __str__(self):
        return self.name
