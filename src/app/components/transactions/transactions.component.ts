import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load transactions';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
