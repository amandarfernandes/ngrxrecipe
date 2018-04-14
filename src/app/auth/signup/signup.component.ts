import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }


  onSignup(form:NgForm) {
    const {email, password} = form.value;
    console.log(email,password)
    //this.authService.signupUser(email,password);
    this.authService.signupUser(email,password);
  }
}
