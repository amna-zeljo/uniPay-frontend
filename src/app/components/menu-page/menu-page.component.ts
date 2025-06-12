import { Component, inject, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddMenuItemDialogComponent } from '../add-menu-item/add-menu-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  pointsPrice: number;
  category: string;
  available: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu-page.component.html',
  imports: [
    NgForOf,
    HttpClientModule,
    MatButtonModule
  ],
  styleUrls: ['./menu-page.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: Product[] = [];

  constructor(protected httpclient: HttpClient,
              protected dialog: MatDialog,
              protected transactionService: TransactionService) {

  }

  userId = "";
  private _snackBar = inject(MatSnackBar);

  private apiUrl = environment.apiUrl;

  ngOnInit(): void {

    this.fetchData()
    this.userId = localStorage.getItem("userId") || "";
    console.log("Got user ", this.userId)

  }

  addItem() {


  }

  deleteItem(id: number) {
    this.httpclient.delete(`${this.apiUrl}/product/` + id, {}).subscribe(() => {
      this.fetchData()
    })


  }
  fetchData() {
    this.httpclient.get<Product[]>(`${this.apiUrl}/product`).subscribe(data => {
      this.menuItems = data;
    })
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddMenuItemDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Menu Item:', result);
        const product: Product = {
          id: -1,
          name: result.name,
          category: result.category,
          description: result.description,
          price: result.price,
          pointsPrice: result.pointsPrice,
          image: "",
          available: true
        }

        this.httpclient.post<Product>(`${this.apiUrl}/product`, product)
          .subscribe(newProduct => {
            this.menuItems.push(newProduct)
          })


      }
    });
  }

  updateItem(product: Product) {

    const dialogRef = this.dialog.open(AddMenuItemDialogComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateProduct: Product = {
          id: product.id,
          name: result.name,
          category: result.category,
          description: result.description,
          price: result.price,
          pointsPrice: result.pointsPrice,
          image: "",
          available: true
        }

        this.httpclient.put<Product>(`${this.apiUrl}/product`, updateProduct)
          .subscribe(newProduct => {
            this.fetchData()
          })


      }
    });


  }

  buyItem(product: Product) {
    console.log("buy product")
    this.transactionService.buyProduct(product.id, this.userId).subscribe({

      next: (response) => {
        this._snackBar.open('Transaction Finished', '', {
          duration: 3000,
          panelClass: ['blue-snackbar']
        });
      },
      error: (err) => {
        this._snackBar.open('Not enough balance', "", {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      }
    })
  }

}
