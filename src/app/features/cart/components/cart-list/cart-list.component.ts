import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.interface';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  cartDetails: Cart = {} as Cart
  isLoading: boolean = false
  private readonly cartService = inject(CartService)
  loadCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {

        this.cartDetails = res
        this.isLoading = true
      }
    })
  }
  ngOnInit(): void {
    this.loadCart()
  }
  removeProduct(id: string) {
    this.cartService.removeCartProduct(id).subscribe({
      next: (res) => {
        this.cartDetails = res
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    })
  }
  updateQuantity(id: string, count: number) {
    this.cartService.updateCartQuality(id, count).subscribe({
      next: (res) => {

        this.cartDetails = res
        this.cartService.cartCounter.set(res.numOfCartItems)

      }
    })
  }
  clearCart(){
    this.cartService.clearCart().subscribe({
      next:()=>{
    this.loadCart()
      }
    })
  }
}
