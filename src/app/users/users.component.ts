import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
    this.apiHome();
  }

  getUsers() {
    this.apiService.get().subscribe((data) => {
      this.users = data;
    });
  }

  apiHome() {
    this.apiService.getApiHome().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
