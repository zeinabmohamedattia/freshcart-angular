import { ProductsService } from './../../services/products.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId!:string|null
  productDetails:Product={}as Product
private readonly activatedRouter=inject(ActivatedRoute)
private readonly productsService=inject(ProductsService)
getProductId(){
  this.activatedRouter.paramMap.subscribe({
    next:(urlData)=>{
      this.productId=urlData.get('id')
    }
  })
  
}
getProductDetails(id:string|null){
  this.productsService.getProductDetails(id).subscribe({
    next:({data})=>{
      this.productDetails=data
    }
  })
}
ngOnInit(): void {
 this.getProductId()
 this.getProductDetails(this.productId)
}
}
