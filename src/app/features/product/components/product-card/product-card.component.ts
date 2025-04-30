import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { StockPipe } from '../../../../shared/pipes/stock.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,DatePipe,CurrencyPipe,StockPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() product!:Product
@Output() addToCart=new EventEmitter<string>()
onAddToCart(){
this.addToCart.emit(this.product._id)
}
}
