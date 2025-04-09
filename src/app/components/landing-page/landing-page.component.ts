import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing-page.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  selectRole(role: 'staff' | 'customer'): void {

    console.log(`Selected role: ${role}`);


  }
  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
}

