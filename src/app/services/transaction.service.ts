import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transaction } from '../models/transaction.model';
import { Product } from '../components/menu-page/menu-page.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = environment.apiUrl;

  getTransactions() {
    return this.httpClient.get<Transaction[]>(`${this.apiUrl}/transactions`)
  }

  buyProduct(productId: number, userId: string){

    return this.httpClient.post<Transaction>(`${this.apiUrl}/product/purchase/${productId}/${userId}`, {})

  }


}
