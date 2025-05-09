import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-cart-view',
  standalone: false,
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe( data => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total = this.cartItems.reduce((total, item) => total + item.price, 0);
    return total
  }

  clearCart(): void {
    console.log('Clearing cart');
    
    this.cartService.clearCart().subscribe();
  }

  checkout(): void {
    console.log('Checking out');
    this.cartService.checkout(this.cartItems).subscribe();
  }
  
}
