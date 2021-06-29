from app.models import Movie, Actor, Producer, Director, Genre, Profile
from rest_framework import serializers
from django.contrib.auth.models import User


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('title', 'description', 'rating', 'director', 'producer', 'cast', 'imageField', 'published_date')


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = (
            'name', 'birthdate', 'years_active', 'nationality', 'imageField', 'twitterAccount', 'instagramAccount')


class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = (
            'name', 'city', 'country', 'website', 'imageField', 'twitterAccount', 'instagramAccount')


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = (
            'name', 'nationality', 'birthdate', 'website', 'imageField', 'twitterAccount', 'instagramAccount')


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.CharField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Profile
        fields = (
            'username', 'email','first_name','last_name','favorite_genres', 'favorite_movies', 'movies_watched', 'want_to_watch', 'imageField')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']
