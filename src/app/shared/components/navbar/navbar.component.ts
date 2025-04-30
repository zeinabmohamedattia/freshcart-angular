import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, computed, inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink,RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  counter=computed(()=>this.cartServices.cartCounter())
  private readonly authService=inject(AuthService)
private readonly cartServices=inject(CartService)
private readonly platformId=inject(PLATFORM_ID)
  @Input() layout!:string
logout(){
  this.authService.logout()
}
ngOnInit(): void {
  this.authService.decodeToken()
  // this.cartServices.cartCounter.subscribe({
  //   next:(value)=>{
  //     this.counter=value
  //   }
  // })
  if (isPlatformBrowser(this.platformId)){
    this.cartServices.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartServices.cartCounter.set(res.numOfCartItems)
      }
    })
  }


}
}
