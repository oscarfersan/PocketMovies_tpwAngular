import { Director } from "./Director";
import { Genre } from "./Genre";
import { Person } from "./Person";
import { Producer } from "./Producer";

export class Movie{
    id:number;
    title:string;
    description:string;
    rating:number;
    director:Director[];
    cast:Person[];
    genre:Genre[];
    producer:Producer[];
    imageField:string;
    published_date:Date;
}