import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  postsForm: FormGroup;
  warning: boolean;
  userPosts: any = [];
  response: any;

  constructor(
    private apiService: ApiService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.userId = +param.get('id');
    });
    this.initialiseForm();
    this.getUser(this.userId);
    this.getUserPosts(this.userId);
  }

  getUser(id: number) {
    this.apiService.getById(id).subscribe((data) => {
      this.userData = data;
    });
  }

  getUserPosts(id: number) {
    this.apiService.getUserPost(id).subscribe((data) => {
      this.userPosts = data;
    });
  }

  initialiseForm() {
    this.postsForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: this.userId,
    });
  }

  submitPost(form: FormGroup) {
    if (!form.valid) {
      this.warning = true;
      return;
    }
    this.warning = false;
    this.apiService.post(this.userId, form.value).subscribe((data) => {
      this.response = data;
      this.getUserPosts(this.userId);
    });
  }
}
