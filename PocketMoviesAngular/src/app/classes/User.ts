import { Genre } from "./Genre";
import { Movie } from "./Movie";

export class User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    favoriteGenres: Genre[];
    favoriteMovies: Movie[];
    watchedMovies: Movie[];
    wantToWatchMovies: Movie[];

    constructor(firstName: string, lastName: string, username: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}