import { Genre } from "./Genre";
import { Person } from "./Person";

export class Movie{
    id:1;
    title:string;
    description:string;
    rating:number;
    director:Person;
    cast:Person[];
    genres:Genre[];
    imageField:string;
    published_date:Date;
}