import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: number;
  userData: any = {};
  constructor(private apiService: ApiService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      console.log(+param.get('id'));
      this.userId = +param.get('id');
    });
    this.getUser(this.userId);
  }

  getUser(id: number) {
    this.apiService.getById(id).subscribe((data) => {
      this.userData = data;
      console.log(data);
    });
  }
}
