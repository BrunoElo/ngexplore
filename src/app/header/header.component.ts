import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
    private ref: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 2000);
  }

  ngOnInit(): void {
    this.getUser(this.authService.getToken());
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }

  getUser(token: string) {
    try {
      this.user = JSON.parse(atob(token.split('.')[1]));
      //this.username = user.name;
      console.log(this.user.name);
      this.ref.detectChanges();
    } catch (error) {
      return null;
    }
  }

  logout() {
    this.authService.logout();
  }
}
