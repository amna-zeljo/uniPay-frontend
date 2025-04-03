import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Make sure these imports are here
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent {
  activeTab: 'scan' | 'input' = 'scan';
  searchUserId: string = '';
  showUserInfo: boolean = false;
  searchError: string | null = null;

  setActiveTab(tab: 'scan' | 'input'): void {
    this.activeTab = tab;
    this.resetSearch();
  }

  resetSearch(): void {
    this.searchUserId = '';
    this.showUserInfo = false;
    this.searchError = null;
  }

  simulateScan(): void {
    this.showUserInfo = true;
  }

  searchUser(): void {
    if (!this.searchUserId.trim()) {
      this.searchError = 'User ID is required';
      this.showUserInfo = false;
      return;
    }
    
    this.showUserInfo = true;
    this.searchError = null;
  }
}