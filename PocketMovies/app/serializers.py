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
        fields = ('id', 'name')

class MovieSerializer(serializers.ModelSerializer):
    cast = ActorSerializer(many=True)
    director = DirectorSerializer(many=True)
    producer = ProducerSerializer(many=True)
    genre = GenreSerializer(many=True)
    class Meta:
        model = Movie
        fields = ('id','title', 'description', 'genre', 'rating', 'director', 'producer', 'cast', 'imageField', 'published_date')
    # def update(self, instance, validated_data):
    #     instance.title = validated_data["title"]
    #     instance.description = validated_data["description"]
    #     instance.rating = validated_data["rating"]
    #     instance.imageField = validated_data["imageField"]
    #     instance.published_date = validated_data["published_date"]
    #     for genre in validated_data["genre"]:
    #         if genre not in instance.genre.all():
    #             instance.genre.add(genre)
    #     for actor in validated_data["cast"]:
    #         if actor not in instance.cast:
    #             instance.cast.add(actor)
    #     for director in validated_data["director"]:
    #         if director not in instance.director:
    #             instance.director.add(director)
    #     for producer in validated_data["producer"]:
    #         if producer not in instance.producer:
    #             instance.producer.add(producer)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return profile