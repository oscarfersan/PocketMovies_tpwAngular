import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../classes/User';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user:User;
  editing:boolean;
  editForm = new FormGroup({
    editUsername:new FormControl('',[Validators.required]),
    editFName: new FormControl('', [Validators.required]),
    editLName: new FormControl('', [Validators.required]),
    editEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  })
  constructor(private userService:UserServiceService) {
    this.editing = false;
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data)=>{
      this.user = data;
    });
  }
  update(){
    this.user.username = this.editForm.get("editUsername").value;
    this.user.firstName = this.editForm.get("editFName").value;
    this.user.lastName = this.editForm.get("editLName").value;
    this.user.email = this.editForm.get("editEmail").value;
    this.editing = false;
  }

}
