"""PocketMovies URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from app import views

urlpatterns = [
    path('movies/<str:movie>', views.list_movies, name='ListMovies'),
    path('people/<str:person>', views.list_people, name='ListActors'),
    path('people/<str:person>/<int:id>', views.infoPeople, name="infoProducer"),
    path('movies/<int:id>', views.infoMovie, name="infoMovie"),

    path('add/actor/', views.addActor, name="addActor"),
    path('add/director/', views.addDirector, name="addDirector"),
    path('add/producer/', views.addProducer, name="addProducer"),
    path('edit/actor/<id>', views.editActor, name="editActor"),
    path('edit/director/<id>', views.editDirector, name="editDirector"),
    path('edit/producer/<id>', views.editProducer, name="editProducer"),
    path('add/movie/', views.addMovie, name="addMovie"),
    path('edit/movie/<id>', views.editMovie, name="editMovie"),
    path('delete/actor/<id>', views.deleteActor, name="deleteActor"),
    path('delete/director/<id>', views.deleteDirector, name="deleteDirector"),
    path('delete/producer/<id>', views.deleteProducer, name="deleteProducer"),
    path('delete/movie/<id>', views.deleteMovie, name="deleteMovie"),



    path('movies/my_favorite_movies/', views.list_movies, {'movie': 'my_favorite_movies'}, name='my_favorite_movies'),
    path('movies/my_want_to_watch/', views.list_movies, {'movie': 'my_want_to_watch'}, name='my_want_to_watch'),
    path('movies/my_watched_movies/', views.list_movies, {'movie': 'my_watched_movies'}, name='my_watched_movies'),


    path('search/', views.searchMovie, name="searchMovie"),



]
