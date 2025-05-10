import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';

  constructor(private productService: ProductService, private cartService: CartService, private snackar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe( data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  addToCart(product: Product): void {
    console.log('Adding to cart', product);
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackar.open('Product added to cart!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  applyFiler(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm);
    });

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string): void {
    this.sortOrder = sortValue;
    if (this.sortOrder === 'priceLowHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
}
