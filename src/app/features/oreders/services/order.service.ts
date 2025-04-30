import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient, private auth:AuthService) { }
  
  checkout(cartId:string|null,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
    const returnUrl="?url=http://localhost:4200"
return this.httpClient.post(environments.baseUrl+'orders/checkout-session/'+cartId +returnUrl,{
  shippingAddress
})
  }
}
