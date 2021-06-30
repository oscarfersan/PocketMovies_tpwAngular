from app.models import Movie, Actor, Producer, Director, Genre, Profile
from rest_framework import serializers
from django.contrib.auth.models import User


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('id',
            'name', 'birthdate', 'years_active', 'nationality', 'imageField', 'twitterAccount', 'instagramAccount')


class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = ('id',
            'name', 'city', 'country', 'website', 'imageField', 'twitterAccount', 'instagramAccount')


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ('id',
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

class MovieSerializer(serializers.ModelSerializer):
    cast = ActorSerializer(many=True)
    director = DirectorSerializer(many=True)
    producer = ProducerSerializer(many=True)
    genre = GenreSerializer(many=True)
    class Meta:
        model = Movie
<<<<<<< HEAD
        fields = ('id','title', 'description', 'rating', 'director', 'producer', 'cast', 'imageField', 'published_date')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']
=======
        fields = ('id','title', 'description', 'genre', 'rating', 'director', 'producer', 'cast', 'imageField', 'published_date')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return profile
>>>>>>> c146b1f6fa46ed68988955f1d43515766c625cad
