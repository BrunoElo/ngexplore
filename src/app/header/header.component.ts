import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string;
  user: any;
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    //this.getUser(this.authService.getToken());
    /* didn't survive a reload
     this.dataService.currentUser$.subscribe((data) => {
      this.user = data;
    }); */
  }

  loggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));

    return this.authService.isLoggedIn();
  }

  /* getUser(token: string) {
    try {
      this.user = JSON.parse(atob(token.split('.')[1]));
      //this.username = user.name;
      console.log(this.user.name);
    } catch (error) {
      return null;
    }
  } */

  logout() {
    this.authService.logout();
  }
}
