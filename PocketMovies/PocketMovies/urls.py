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
from django.urls import path, include
from app import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('admin/', admin.site.urls),
    path('register/', views.register_user, name='Register'),
    path('login/', obtain_jwt_token, name='Login'),
    path('refresh-token/', refresh_jwt_token),
    path('permissions/', views.getPermissions),
    path('genres/', views.list_genres, name='Genres'),
    path('movies/<str:movie>', views.list_movies, name='ListMovies'),
    path('people/<str:person>', views.list_people, name='ListActors'),
    path('people/<str:person>/<int:id>', views.infoPeople, name="infoProducer"),
    path('movies/<int:id>', views.infoMovie, name="infoMovie"),
    path('profile/', views.infoProfile, name="Profile"),
    path('add/favorites/<int:id>', views.addMyFavoriteMovies, name="AddToFavorites"),
    path('add/watched/<int:id>', views.addMoviesWatched, name="AddToWatched"),
    path('add/want_to_watch/<int:id>', views.addWantToWatch, name="AddToWantToWatch"),
    path('remove/favorites/<int:id>', views.deleteMyFavoriteMovies, name="RemoveToFavorites"),
    path('remove/watched/<int:id>', views.deleteMoviesWatched, name="RemoveToWatched"),
    path('remove/want_to_watch/<int:id>', views.deleteWantToWatch, name="RemoveToWantToWatch"),

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




]
