import { Product } from '../../models/cart.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
@Input() product:Product ={} as Product
@Output() removeProduct=new EventEmitter<string>()
@Output() updateCart=new EventEmitter<{id:string,count:number}>()
onRemove(){
this.removeProduct.emit(this.product.product._id)
}
onUpdate(count:number){
  this.updateCart.emit({id:this.product.product._id,count})
  }
}
