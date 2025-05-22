import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private apiUrl = 'http://localhost:8080/api';
  
  constructor(private http: HttpClient) { }

  //for customer methods
  getCustomerHomePageData(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/home/customer/${userId}`);
  }

  getCurrentCustomer(): Observable<any> {
    //but for now, hardcode user ID 1 for testing
    return this.getCustomerHomePageData(1);
  }

  getBalance(): Observable<number> {
    //this will be extracted from the customer home page data
    return new Observable<number>(observer => {
      this.getCurrentCustomer().subscribe({
        next: (data) => {
          observer.next(data.balance);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  getSubscriptionPoints(): Observable<number> {
    //and this will be extracted from the customer home page data
    return new Observable<number>(observer => {
      this.getCurrentCustomer().subscribe({
        next: (data) => {
          observer.next(data.points);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  //for staff methods
  getStaffHomePageData(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/home/staff/${userId}`);
  }

  getCurrentStaff(): Observable<any> {
    //but for now, hardcode user ID 2 for testing
    return this.getStaffHomePageData(2);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/home/customer/${id}`);
  }
}