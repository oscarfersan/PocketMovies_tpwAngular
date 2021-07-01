from django.core.mail import send_mail
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "To restore you password save this token and use it in the reset password page: /n {}".format(reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for PocketMovies",
        # message:
        email_plaintext_message,
        # from:
        "marta.martocas@hotmail.com",
        # to:
        [reset_password_token.user.email]
    )


# Create your models here.
class Actor(models.Model):
    name = models.CharField(max_length=255)
    birthdate = models.DateField()
    years_active = models.IntegerField()
    nationality = models.CharField(max_length=50)
    imageField = models.URLField(blank=True)
    twitterAccount = models.CharField(max_length=255, blank=True)
    instagramAccount = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Producer(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    website = models.URLField()
    imageField = models.URLField(blank=True)
    twitterAccount = models.CharField(max_length=255, blank=True)
    instagramAccount = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Director(models.Model):
    name = models.CharField(max_length=255)
    nationality = models.CharField(max_length=50, blank=True)
    birthdate = models.DateField()
    website = models.URLField(blank=True)
    imageField = models.URLField(blank=True)
    twitterAccount = models.CharField(max_length=255, blank=True)
    instagramAccount = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=50, default="Undefined")
    description = models.CharField(max_length=300)
    rating = models.FloatField()
    director = models.ManyToManyField(Director)
    producer = models.ManyToManyField(Producer)
    cast = models.ManyToManyField(Actor)
    genre = models.ManyToManyField(Genre)
    imageField = models.URLField(blank=True)
    published_date = models.DateField(null=True)
    def __str__(self):
        return self.title


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # profile_picture = models.ImageField(blank=True)
    favorite_genres = models.ManyToManyField(Genre, blank=True)
    favorite_movies = models.ManyToManyField(Movie, related_name='user_favorite_movies', blank=True)
    movies_watched = models.ManyToManyField(Movie, related_name='user_watched_movies', blank=True)
    want_to_watch = models.ManyToManyField(Movie, related_name='user_wanttowatch_movies', blank=True)
    imageField = models.URLField(blank=True)

    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
        instance.profile.save()
