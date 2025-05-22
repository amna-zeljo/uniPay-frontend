import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageService } from '../../services/home-page.service';

interface MealPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  meals: number;
}



@Component({
  selector: 'app-customer-topup',
  templateUrl: './customer-topup.component.html',
  styleUrls: ['./customer-topup.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CustomerTopupComponent implements OnInit {
  customerData: any = null;
  loading: boolean = true;
  error: string | null = null;
  selectedPlan: MealPlan | null = null;
  showInstructions: boolean = false;
  
  mealPlans: MealPlan[] = [
    {
      id: '10',
      name: '10 meals/month',
      description: 'Budget-friendly option with 10 meals per month. Enjoy delicious meals at a discounted price.',
      price: 40,
      meals: 10
    },
    {
      id: '20',
      name: '20 meals/month',
      description: 'Our most popular plan with 20 meals per month. Perfect for regular campus visitors.',
      price: 70,
      meals: 20
    }
  ];
  
  constructor(
    private homePageService: HomePageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    this.loading = true;
    
    this.homePageService.getCurrentCustomer().subscribe({
      next: (data) => {
        this.customerData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load customer information';
        this.loading = false;
        console.error(err);
      }
    });
  }

  selectPlan(plan: MealPlan): void {
    this.selectedPlan = plan;
  }

  topUp(): void {
    if (!this.selectedPlan) {
      this.error = 'Please select a meal plan';
      return;
    }
    
    this.showInstructions = true;
  }

  navigateToHome(): void {
    this.router.navigate(['/customer']);
  }

  navigateToMenu(): void {
    //this would navigate to a menu page if implemented
    alert('Menu feature coming soon');
  }
}