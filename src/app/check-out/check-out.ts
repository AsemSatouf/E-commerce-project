import { Component } from '@angular/core';
import { cardItem, CardService } from '../card-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-check-out',
  imports: [CommonModule, RouterLink],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css'
})
export class CheckOut {
cartItems: cardItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService:CardService) {}

  ngOnInit() {
   
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotal();
    });
  }

}
