import { Genre } from "./Genre";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    favoriteGenres: Genre[];

}