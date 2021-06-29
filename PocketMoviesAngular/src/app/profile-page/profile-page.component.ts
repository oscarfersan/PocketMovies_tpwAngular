import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user:User={
    id:1,
    username:'aux',
    email:'aux@gmail.com',
    first_name:'AUX',
    last_name:'AUX',
    genre:'Action',
    imageField:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog',
    token:'1234',
  }
  constructor() { }

  ngOnInit(): void {
  }

}
