import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private router:Router,
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      this.loginForm = formBuilder.group({
        'email' : [null, [Validators.required]],
        'password' : [null, [Validators.required]]
      });
    }

  public login(values:any) {
    this.userService.login(values);
  }

  ngOnInit() {
  }

}
