import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageService } from '../../services/home-page.service';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    QRCodeComponent, // <-- for qr code to be implemented via package
  ]
})
export class CustomerHomeComponent implements OnInit {
  customerData: any = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private homePageService: HomePageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    this.loading = true;

    this.homePageService.getCurrentCustomer().subscribe({
      next: (data) => {
        this.customerData = data;
        console.log(this.customerData)
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load customer information';
        this.loading = false;
        console.error(err);
      }
    });
  }

  navigateToTopUp(): void {
    this.router.navigate(['/customer/topup']);
  }

  navigateToTransactions(): void {
    //this would navigate to a transactions page if implemented
    alert('Transaction log feature coming soon');
  }

  navigateToMenu(): void {
    this.router.navigate(['/menuItems']);
  }

  generateQrCodeUrl(){
    return "http://localhost:4200/customer/" + this.customerData.userId
  }
}
