import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router) { }

  //for customer methods
  getCustomerHomePageData(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/homepage/customer/${userId}`);
  }

  getCurrentCustomer(): Observable<any> {
    //but for now, hardcode user ID 1 for testing
    const userId = localStorage.getItem("userId")
    if(!userId){
      this.router.navigate(["/"])
      return EMPTY
    }else {
      return this.getCustomerHomePageData(parseInt(userId));
    }

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
    return this.http.get(`${this.apiUrl}/homepage/staff/${userId}`);
  }

  getCurrentStaff(): Observable<any> {
    //but for now, hardcode user ID 13 for testing
    return this.getStaffHomePageData(13);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/homepage/customer/${id}`);
  }
}
