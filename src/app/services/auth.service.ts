import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor() {
    //note to self: in a real app --> load the user from localStorage, a token, or an API call
    //but for testing purposes, we'll set a default user
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    //note: this would typically come from localStorage or a token
    //but for testing, we'll just set a default user
    this.currentUser = {
      id: 1, //aaand this would be the actual user ID from the authentication system
      role: 'customer' // or 'staff' depending on the user type
    };
  }

  getCurrentUserId(): number | null {
    return this.currentUser ? this.currentUser.id : null;
  }

  getUserRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}