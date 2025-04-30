import { CartService } from './../../../cart/services/cart.service';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,SearchPipe,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts:Product[]=[]
  searchTerm=''
private readonly productServices=inject(ProductsService)
private readonly cartServices=inject(CartService)
private readonly toast=inject(ToastrService)
getAllProducts(){
  this.productServices.getProducts().subscribe({
    next:({data})=>{
      this.allProducts=data
    }
  })
}

ngOnInit(): void {
this.getAllProducts()
}
addProductToCart(id:string){
  this.cartServices.addProductToCart(id).subscribe({
    next:(res)=>{
    this.cartServices.cartCounter.set(res.numOfCartItems)
      this.showToaster(res.message)
    }
  })
}
showToaster(msg:string) {
  this.toast.success(msg,'',{
    progressBar:true,
    timeOut:1500
  });
}
}
