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
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *


def checkGroup(request):
    if request.user.groups.filter(name="client").exists():
        return "client"
    else:
        return "admin"


def register_user(request):
    register_form = SignUpForm()
    if request.method == 'POST':
        register_form = SignUpForm(request.POST)
        if register_form.is_valid():
            new_user = register_form.save()
            new_user.refresh_from_db()

            new_user.profile.user.first_name = register_form.cleaned_data['fname']
            new_user.profile.user.last_name = register_form.cleaned_data['lname']
            new_user.profile.user.email = register_form.cleaned_data['email']
            new_user.profile.favorite_genres.set(register_form.cleaned_data['favorite_genres'])

            group = Group.objects.get(name="client")
            new_user.groups.add(group)
            messages.success(request, "Registration successful.")
            return redirect('home')
        messages.error(request, register_form.errors.as_data())

    return render(request, "register.html", {"form": register_form})


def login_user(request):
    if request.method == 'POST':
        login_form = LoginForm(request, data=request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"User {username} successfully logged in!")
                request.session['username'] = username
                return redirect('ListMovies')
            else:
                messages.error(request, "Invalid username or password.")
                return render(request, "login.html", {"form": login_form})
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, "login.html", {"form": login_form})
    else:
        login_form = LoginForm()
        return render(request, "login.html", {"form": login_form})


@login_required()
def logout_user(request):
    logout(request)
    try:
        del request.session['username']
    except KeyError:
        pass
    return redirect('home')


def home(request):
    if request.user.groups.filter(name="client").exists():
        group = "client"
    else:
        group = "admin"
    return render(request, "home.html", {"user": request.user, "group": group})


@login_required()
def searchMovie(request):
    title = request.GET["title"]
    movie = Movie.objects.filter(title__icontains=title)
    tparams = {'movie_list': movie, 'genre_list': Genre.objects.all()}
    return redirect('/movies/', tparams)


# ----------------------------------------------------------------------------------


# 'movies/<str:movie>
@api_view(['GET'])
def list_movies(request, movie):
    profile = Profile.objects.get(user=User.objects.get(username=request.GET['username']))
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

    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


# people/<str:person>
@api_view(['GET'])
def list_people(request, person):
    if person == 'actors':
        people = Actor.objects.all()
        person_role = 'actor'.upper()
        if 'title' in request.GET:
            search_term = request.GET['title']
            people = people.filter(name__icontains=search_term)
        serializer = ActorSerializer(people, many=True)
    elif person == 'producers':
        people = Producer.objects.all()
        person_role = 'producer'.upper()
        if 'title' in request.GET:
            search_term = request.GET['title']
            people = people.filter(name__icontains=search_term)
        serializer = ProducerSerializer(people, many=True)
    elif person == 'directors':
        people = Director.objects.all()
        person_role = 'director'.upper()
        if 'title' in request.GET:
            search_term = request.GET['title']
            people = people.filter(name__icontains=search_term)
        serializer = DirectorSerializer(people, many=True)

    return Response(serializer.data)


# 'people/<str:person>/<int:id>
@api_view(['GET'])
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
def addActor(request):
    serializer = ActorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# add/director/
@api_view(['POST'])
def addDirector(request):
    serializer = DirectorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# add/producer/
@api_view(['POST'])
def addProducer(request):
    serializer = ProducerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# add/movie/
@api_view(['POST'])
def addMovie(request):
    serializer = MovieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/actor/<id>
@api_view(['PUT'])
def editActor(request, id):
    id = request.data['id']
    try:
        actor = Actor.objects.get(id=id)
    except Actor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ActorSerializer(actor, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/director/<id>
@api_view(['PUT'])
def editDirector(request, id):
    id = request.data['id']
    try:
        director = Director.objects.get(id=id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ActorSerializer(director, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/producer/<id>
@api_view(['PUT'])
def editProducer(request, id):
    id = request.data['id']
    try:
        producer = Producer.objects.get(id=id)
    except Producer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProducerSerializer(producer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# edit/movie/<id>
@api_view(['PUT'])
def editMovie(request, id):
    id = request.data['id']
    try:
        movie = Movie.objects.get(id=id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = MovieSerializer(movie, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# delete/actor/<id>
@api_view(['DELETE'])
def deleteActor(request, id):
    try:
        actor = Actor.objects.get(id=id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    actor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/director/<id>
def deleteDirector(request, id):
    try:
        director = Director.objects.get(id=id)
    except Director.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    director.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/producer/<id>
@api_view(['DELETE'])
def deleteProducer(request, id):
    try:
        producer = Producer.objects.get(id=id)
    except Producer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    producer.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/movie/<id>
@api_view(['DELETE'])
def deleteMovie(request, id):
    try:
        movie = Movie.objects.get(id=id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    movie.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/my_favorite_movies/<id>
@api_view(['DELETE'])
def deleteMyFavoriteMovies(request, id):
    try:
        movie = Movie.objects.get(id=id)
        profile = Profile.objects.get(id=0)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.favorite_movies.remove(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/movies_watched/<id>
@api_view(['DELETE'])
def deleteMoviesWatched(request, id):
    try:
        movie = Movie.objects.get(id=id)
        profile = Profile.objects.get(id=0)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.movies_watched.remove(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# delete/want_to_watch/<id>
@api_view(['DELETE'])
def deleteWantToWatch(request, id):
    try:
        movie = Movie.objects.get(id=id)
        profile = Profile.objects.get(id=0)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.want_to_watch.remove(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# add/my_favorite_movies/<id>
@api_view(['POST'])
def addMyFavoriteMovies(request):
    try:
        movie = Movie.objects.get(id=id)
        profile = Profile.objects.get(id=0)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.favorite_movies.add(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# add/movies_watched/<id>
@api_view(['POST'])
def addMoviesWatched(request):
    try:
        movie = Movie.objects.get(id=id)
        profile = Profile.objects.get(id=0)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.movies_watched.add(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)


# add/want_to_watch/<id>
@api_view(['POST'])
def addWantToWatch(request):
    try:
        movie = Movie.objects.get(id=id)
        profile = Profile.objects.get(id=0)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    profile.want_to_watch.add(movie)
    return Response(status=status.HTTP_204_NO_CONTENT)
