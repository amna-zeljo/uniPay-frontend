import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';
import {HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {AddMenuItemDialogComponent} from '../add-menu-item/add-menu-item.component';
import {MatDialog} from '@angular/material/dialog';
import {MatButton, MatButtonModule} from '@angular/material/button';

export interface Product {
  id:number;
  name: string;
  description: string;
  price: number;
  image: string;
  pointsPrice:number;
  category:string;
  available:boolean;
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

  constructor(protected httpclient:HttpClient,
              protected dialog:MatDialog) {

  }

  ngOnInit(): void {

this.fetchData()
  }

  addItem() {
    /*this.httpclient.post("http://localhost:8080/menuItem", {}).subscribe(() => {
    })
    this.fetchData()*/

  }

  deleteItem(id:number) {
    this.httpclient.delete("http://localhost:8081/product/" + id, {}).subscribe(() => {
      this.fetchData()
    })


  }
  fetchData(){
    this.httpclient.get<Product[]>("http://localhost:8081/product").subscribe(data => {
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
        const product:Product={
          id: -1,
          name:result.name,
          category:result.category,
          description:result.description,
          price:result.price,
          pointsPrice:result.pointsPrice,
          image:"",
          available:true
        }

        this.httpclient.post<Product>("http://localhost:8081/product", product)
          .subscribe(newProduct => {
            this.menuItems.push(newProduct)
          })


      }
    });
  }



  updateItem(product:Product) {

    const dialogRef = this.dialog.open(AddMenuItemDialogComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateProduct:Product={
          id: product.id,
          name:result.name,
          category:result.category,
          description:result.description,
          price:result.price,
          pointsPrice:result.pointsPrice,
          image:"",
          available:true
        }

        this.httpclient.put<Product>("http://localhost:8081/product", updateProduct)
          .subscribe(newProduct => {
            this.fetchData()
          })


      }
    });


  }
}
