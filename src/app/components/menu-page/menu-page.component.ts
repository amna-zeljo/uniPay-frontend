import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu-page.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./menu-page.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      name: 'Pesto Pasta',
      description: 'Fresh pesto sauce with finely diced cherry tomatoes with mushrooms, baby carrots & rare beef pasta.',
      price: 12.99,
      image: 'assets/pesto-pasta.jpg'
    },
    {
      name: 'Chicken Risotto',
      description: 'Creamy risotto rice slowly simmered with season of vegetables. Served with glazed chicken and fresh vegetables.',
      price: 14.99,
      image: 'assets/images/chicken-risotto.jpg'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
