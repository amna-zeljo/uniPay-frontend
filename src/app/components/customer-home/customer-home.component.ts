import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {
  activeTab: 'home' | 'transactions' | 'topup' = 'home';

  setActiveTab(tab: 'home' | 'transactions' | 'topup'): void {
    this.activeTab = tab;
  }
}