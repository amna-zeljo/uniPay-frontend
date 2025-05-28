import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {Product} from '../menu-page/menu-page.component';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule]
})
export class AddMenuItemDialogComponent implements  OnInit{
  menuItemForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMenuItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.menuItemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      pointsPrice: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  save() {
    if (this.menuItemForm.valid) {
      this.dialogRef.close(this.menuItemForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    console.log(this.data)
    if (this.data==undefined)return;
    this.menuItemForm.setValue({
      name: this.data.name,
      category:this.data.category,
      description:this.data.description,
      price:this.data.price,
      pointsPrice:this.data.pointsPrice
    })


  }
}
