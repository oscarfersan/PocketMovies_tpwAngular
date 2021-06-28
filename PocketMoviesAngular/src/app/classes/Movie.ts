import { Genre } from "./Genre";
import { Person } from "./Person";
import { Producer } from "./Producer";

export class Movie{
    id:1;
    title:string;
    description:string;
    rating:number;
    director:Person[];
    cast:Person[];
    genres:Genre[];
    producer:Producer[];
    imageField:string;
    published_date:Date;
}