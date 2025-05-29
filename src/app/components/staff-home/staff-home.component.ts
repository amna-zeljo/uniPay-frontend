import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageService } from '../../services/home-page.service';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StaffHomeComponent implements OnInit {
  activeTab: 'scan' | 'input' = 'scan';
  customerId: string = '';
  staffData: any = null;
  customerInfo: any = null;
  loading: boolean = true;
  error: string | null = null;
  
  constructor(private homePageService: HomePageService) {}

  ngOnInit(): void {
    this.loadStaffData();
  }

  loadStaffData(): void {
    this.loading = true;
    
    this.homePageService.getCurrentStaff().subscribe({
      next: (data) => {
        this.staffData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load staff information';
        this.loading = false;
        console.error(err);
      }
    });
  }

  setActiveTab(tab: 'scan' | 'input'): void {
    this.activeTab = tab;
    //to reset customer info when switching tabs
    this.customerInfo = null;
    this.customerId = '';
    this.error = null;
  }

  scanQrCode(): void {
    // In a real app, this would activate the device camera
    this.error = 'Camera functionality is not available in this demo. Please use the input tab to enter a customer ID.';
  }

  lookupCustomer(): void {
    if (!this.customerId) {
      this.error = 'Please enter a customer ID';
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    this.homePageService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        this.customerInfo = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Customer not found';
        this.customerInfo = null;
        this.loading = false;
        console.error(err);
      }
    });
  }
}