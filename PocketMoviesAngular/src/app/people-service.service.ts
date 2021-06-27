import { Injectable } from '@angular/core';
import { Person } from './classes/Person';

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {
  cast: Person[] = [
    {id:1, name: 'Lewis Tan', birthdate: new Date(1987, 2, 4), nationality: 'British', imageField: 'https://m.media-amazon.com/images/M/MV5BZjBhMTJkNjktYWFkNC00NmQ3LWExZGItMzEwMTRlZWQ1MmRhXkEyXkFqcGdeQXVyNzYxNjMxOA@@._V1_UY317_CR131,0,214,317_AL_.jpg', twitterAccount: '@TheLewisTan', instagramAccount: '@lewistanofficial' },
    {id:2, name: 'Jessica McNamee', birthdate: new Date(1986, 6, 1), nationality: 'Australian', imageField: 'https://m.media-amazon.com/images/M/MV5BODBkNTYwZTAtZDMxOC00M2JmLWE0M2UtOGFjNjljMjNkYTU4XkEyXkFqcGdeQXVyNjkxNzc0Mzg@._V1_UX214_CR0,0,214,317_AL_.jpg', twitterAccount: '@jessica_mcnamee', instagramAccount: '@jessica_mcnamee' },
    {id:3, name: 'Josh Lawson', birthdate: new Date(1981, 6, 22), nationality: 'Australian', imageField: 'https://m.media-amazon.com/images/M/MV5BOTIzNmQ2OTAtM2ViOC00NzJhLTk3ZWUtY2E4NDBhYjMzZTRmXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_UX214_CR0,0,214,317_AL_.jpg', twitterAccount: '@josh_lawson', instagramAccount: '@thatjoshlawson' },
    {id:4, name: 'Joe Taslim', birthdate: new Date(1981, 6, 23), nationality: 'Indonesian', imageField: 'https://m.media-amazon.com/images/M/MV5BNDQzMjk3YjEtZjU5Ny00M2M5LTg0N2UtZGVjZDJkNWIxOGI0XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY317_CR130,0,214,317_AL_.jpg', twitterAccount: '@Joe_Taslim', instagramAccount: '@joe_taslim' },
  ]
  constructor() { }

  getPeople():Person[]{
    return this.cast;
  }
}
