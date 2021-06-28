import { Injectable } from '@angular/core';
import { Genre } from './classes/Genre';
import { Movie } from './classes/Movie';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {

    constructor() {
    }

    fetchFavoriteMovies(): Movie[] {
        return [
            {'title': 'Mortal Kombat', 'description': 'MMA fighter Cole Young seeks out Earth\'s greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.', 'rating': 6.3, 'cast': [], 'imageField': 'https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg',  'published_date': new Date(2021, 4, 23)},
            {'title': 'Nobody', 'description': 'A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord.', 'rating': 7.5, 'cast': [],'imageField': 'https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_UX182_CR0,0,182,268_AL_.jpg',  'published_date': new Date(2021, 4, 26)},
            {'title': 'The Avengers', 'description': 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', 'rating': 8.0, 'cast': [], 'imageField': 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',  'published_date': new Date(2012, 5, 4)}
        ]
    }

    fetchWatchedMovies(): Movie[] {
        return [
            {'title': 'Mortal Kombat', 'description': 'MMA fighter Cole Young seeks out Earth\'s greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.', 'rating': 6.3, 'cast': [], 'imageField': 'https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg',  'published_date': new Date(2021, 4, 23)},
            {'title': 'Nobody', 'description': 'A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord.', 'rating': 7.5, 'cast': [],'imageField': 'https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_UX182_CR0,0,182,268_AL_.jpg',  'published_date': new Date(2021, 4, 26)},
            {'title': 'The Avengers', 'description': 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', 'rating': 8.0, 'cast': [], 'imageField': 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',  'published_date': new Date(2012, 5, 4)}
        ]
    }

    fetchMustWatchMovies(): Movie[] {
        return [
            {'title': 'Mortal Kombat', 'description': 'MMA fighter Cole Young seeks out Earth\'s greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.', 'rating': 6.3, 'cast': [], 'imageField': 'https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg',  'published_date': new Date(2021, 4, 23)},
            {'title': 'Nobody', 'description': 'A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord.', 'rating': 7.5, 'cast': [],'imageField': 'https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_UX182_CR0,0,182,268_AL_.jpg',  'published_date': new Date(2021, 4, 26)},
            {'title': 'The Avengers', 'description': 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', 'rating': 8.0, 'cast': [], 'imageField': 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',  'published_date': new Date(2012, 5, 4)}
        ]
    }

}
