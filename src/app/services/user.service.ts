import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Note: this will change but for the sake of hw3: dummy data
  private currentUser: User = {
    id: 'USR001',
    name: 'Hasho Mahalash',
    balance: 150.00,
    subscriptionPoints: 25
  };

  constructor() { }

  //Note: this will change but for the sake of hw3: get current user (dummy implementation)
  getCurrentUser(): User {
    return this.currentUser;
  }

  //Note: this will change but for the sake of hw3: search user by ID (dummy implementation for staff)
  searchUserById(id: string): User | null {
    if (id === 'USR001') {
      return this.currentUser;
    }
    return null;
  }
}