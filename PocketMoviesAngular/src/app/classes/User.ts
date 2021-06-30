<<<<<<< HEAD
export class User{
    id:number;
    username:string;
    first_name:string;
    last_name:string;
    email:string;
    token:string;
    genre:string;
    imageField:string;
=======
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
>>>>>>> c146b1f6fa46ed68988955f1d43515766c625cad
}