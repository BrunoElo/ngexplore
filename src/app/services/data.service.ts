import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Observable string sources
  private currentUserSource = new BehaviorSubject<string>('');
  // Observable string streams
  currentUser$ = this.currentUserSource.asObservable();

  constructor() {}

  saveCurrentUser(data: string) {
    this.currentUserSource.next(data);
  }
}
