import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient,private auth:AuthService) { }
  // cartCounter=new BehaviorSubject<number>(0)
  cartCounter:WritableSignal<number>=signal<number>(0)
  addProductToCart(productId:string):Observable<any>{
    return this.httpClient.post(environments.baseUrl+'cart',{
      productId
    } )
  }
  updateCartQuality(productId:string,count:number):Observable<any>{
   return this.httpClient.put(environments.baseUrl+'cart/'+productId,{
      count
    } )
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(environments.baseUrl+'cart/' )
  }
  removeCartProduct(productId:string):Observable<any>{
   return this.httpClient.delete(environments.baseUrl+'cart/'+productId )
  }
  clearCart( ):Observable<any>{
   return this.httpClient.delete(environments.baseUrl+'cart' )
  }
}
