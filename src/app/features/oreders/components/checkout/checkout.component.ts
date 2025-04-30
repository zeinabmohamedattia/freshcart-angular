import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,ValidationMessagesComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  resMsg:string=''
  checkoutForm!:FormGroup
  isLoading:boolean=true
  cartId:string |null =''
  private readonly checkoutService =inject(OrderService)
  private readonly activatedRoute =inject(ActivatedRoute)
   
      submitForm(){
        this.isLoading=false
        if(this.checkoutForm.valid ||!this.isLoading){
          this.checkoutService.checkout(this.cartId,this.checkoutForm.value).subscribe({
            next:(res)=>{
              console.log(res);
              this.isLoading=true
              open(res.session.url,'_self')
            }
          })
          
        }
      }
      formInit(){
        this.checkoutForm = new FormGroup({
          details: new FormControl('', [Validators.required]),
          phone: new FormControl('', [Validators.required]),
          city: new FormControl( '', [Validators.required]),
        });
      }
      ngOnInit(): void {
      this.getCartId()
      this.formInit()
      }
      getCartId(){
        this.activatedRoute.paramMap.subscribe({
          next:(data)=>{
            this.cartId=data.get('id') 
          }
        })
      }
    
}
