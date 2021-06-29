from django import template
from django.contrib.auth.models import Group
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from app.models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.forms.models import model_to_dict
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from app.serializers import *
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = ProfileSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        profile = serializer.save()
        group = Group.objects.get(name="client")
        profile.user.groups.add(group)
        token = Token.objects.get(user=profile.user).key
        data = {'first name': profile.user.first_name, 'email': profile.user.email, 'username': profile.user.username,
                'token': token}
        serializer.save()
        return Response(data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 'movies/<str:movie>
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_movies(request, movie):
    user = request.user
    profile = Profile.objects.get(user=user)
    genre = ''
    if movie == 'all':
        movies = Movie.objects.all()
    elif movie == 'my_favorite_movies':
        movies = profile.favorite_movies.all()
    elif movie == 'my_want_to_watch':
        movies = profile.want_to_watch.all()
    elif movie == 'my_watched_movies':
        movies = profile.movies_watched.all()

    if 'genre' in request.GET:
        genre = request.GET['genre']
        if genre and genre != "All":
            genre_object = Genre.objects.get(name=genre)
            movies = movies.filter(genre=genre_object)

    if 'title' in request.GET:
        search_term = request.data['title']
        movies = movies.filter(title__icontains=search_term)

    paginator = PageNumberPagination()
    result_page = paginator.paginate_queryset(movies, request)
    serializer = MovieSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)



# 'genres
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_genres(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)


# people/<str:person>
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_people(request, person):
    if person == 'actors':
        people = Actor.objects.all()
        if 'title' in request.GET:
            search_term = request.GET['title']
            people = people.filter(name__icontains=search_term)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(people, request)
        serializer = ActorSerializer(result_page, many=True)
    elif person == 'producers':
        people = Producer.objects.all()
        if 'title' in request.GET:
            search_term = request.GET['title']
            people = people.filter(name__icontains=search_term)
        paginator = PageNumberPagination()
        paginator.page_size = 9
        result_page = paginator.paginate_queryset(people, request)
        serializer = ProducerSerializer(result_page, many=True)
    elif person == 'directors':
        people = Director.objects.all()
        if 'title' in request.GET:
            search_term = request.GET['title']
            people = people.filter(name__icontains=search_term)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(people, request)
        serializer = DirectorSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


# 'people/<str:person>/<int:id>
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def infoPeople(request, person, id):
    if person == 'actors':
        try:
            actor = Actor.objects.get(id=id)
            serializer = ActorSerializer(actor)
            return Response(serializer.data)
        except:
            actor = None
            serializer = ActorSerializer(actor)
            return Response(serializer.data)
    elif person == 'producers':
        try:
            producer = Producer.objects.get(id=id)
            serializer = ProducerSerializer(producer)
            return Response(serializer.data)
        except:
            producer = None
            serializer = ProducerSerializer(producer)
            return Response(serializer.data)
    elif person == 'directors':
        try:
            director = Producer.objects.get(id=id)
            serializer = DirectorSerializer(director)
            return Response(serializer.data)
        except:
            producer = None
            serializer = ProducerSerializer(producer)
            return Response(serializer.data)


# 'movies/<int:id>
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def infoMovie(request, movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
        serializer = ActorSerializer(movie)
        return Response(serializer.data)
    except:
        movie = None
        serializer = ActorSerializer(movie)
        return Response(serializer.data)


# add/actor/
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addActor(request):
    serializer = ActorSerializer(data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# add/director/
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addDirector(request):
    serializer = DirectorSerializer(data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# add/producer/
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProducer(request):
    serializer = ProducerSerializer(data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# add/movie/
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMovie(request):
    serializer = MovieSerializer(data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/actor/<id>
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editActor(request, id):
    id = request.data['id']
    try:
        actor = Actor.objects.get(id=id)
    except Actor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ActorSerializer(actor, data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/director/<id>
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editDirector(request, id):
    id = request.data['id']
    try:
        director = Director.objects.get(id=id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ActorSerializer(director, data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/producer/<id>
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editProducer(request, id):
    id = request.data['id']
    try:
        producer = Producer.objects.get(id=id)
    except Producer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProducerSerializer(producer, data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/movie/<id>
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editMovie(request, id):
    id = request.data['id']
    try:
        movie = Movie.objects.get(id=id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = MovieSerializer(movie, data=request.data)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# delete/actor/<id>
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteActor(request, id):
    try:
        actor = Actor.objects.get(id=id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    actor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/director/<id>
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteDirector(request, id):
    try:
        director = Director.objects.get(id=id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    director.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/producer/<id>
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProducer(request, id):
    try:
        producer = Producer.objects.get(id=id)
    except Producer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    producer.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/movie/<id>
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMovie(request, id):
    try:
        movie = Movie.objects.get(id=id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = request.user
    if user.groups.filter(name="client").exists():
        return Response(status=status.HTTP_403_FORBIDDEN)
    movie.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/my_favorite_movies/<id>
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMyFavoriteMovies(request, id):
    try:
        movie = Movie.objects.get(id=id)
        user = request.user
        profile = Profile.objects.get(user=user)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user != profile.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile.favorite_movies.remove(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/movies_watched/<id>
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def deleteMoviesWatched(request, id):
    try:
        movie = Movie.objects.get(id=id)
        user = request.user
        profile = Profile.objects.get(user=user)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user != profile.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile.movies_watched.remove(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/want_to_watch/<id>
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def deleteWantToWatch(request, id):
    try:
        movie = Movie.objects.get(id=id)
        user = request.user
        profile = Profile.objects.get(user=user)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user != profile.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile.want_to_watch.remove(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# add/my_favorite_movies/<id>
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMyFavoriteMovies(request):
    try:
        movie = Movie.objects.get(id=id)
        user = request.user
        profile = Profile.objects.get(user=user)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user != profile.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile.favorite_movies.add(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# add/movies_watched/<id>
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addMoviesWatched(request):
    try:
        movie = Movie.objects.get(id=id)
        user = request.user
        profile = Profile.objects.get(user=user)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.movies_watched.add(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# add/want_to_watch/<id>
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addWantToWatch(request):
    try:
        movie = Movie.objects.get(id=id)
        user = request.user
        profile = Profile.objects.get(user=user)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if user != profile.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile.want_to_watch.add(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)
