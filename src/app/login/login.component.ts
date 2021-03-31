import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser(form: FormGroup) {
    console.log(form.value);
    this.authService.login(form.value).subscribe((data) => {
      console.log(data);
      localStorage.setItem('access_token', data.token);
      this.getUserFromToken(data.token);
      this.router.navigate(['users']);
    });
  }

  getUserFromToken(token: string) {
    try {
      const user = JSON.parse(atob(token.split('.')[1]));
      //this.username = user.name;
      //this.dataService.saveCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      return null;
    }
  }
}
