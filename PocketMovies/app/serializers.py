from app.models import Movie, Actor, Producer, Director, Genre, Profile
from rest_framework import serializers


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
    class Meta:
        model = Profile
        fields = (
            'user', 'favorite_genres', 'favorite_movies', 'movies_watched', 'want_to_watch', 'imageField')


class MovieSerializer(serializers.ModelSerializer):
    cast = ActorSerializer(many=True)
    director = DirectorSerializer(many=True)
    producer = ProducerSerializer(many=True)
    class Meta:
        model = Movie
        fields = ('title', 'description', 'rating', 'director', 'producer', 'cast', 'imageField', 'published_date')
