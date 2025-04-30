import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule,ValidationMessagesComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    resMsg:string=''
    isLoading:boolean=true
    private readonly authService =inject(AuthService)
    private readonly router =inject(Router)
      authForm = new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
        });
        submitForm(){
          this.isLoading=false
          if(this.authForm.valid ||!this.isLoading){
            
            this.authService.login(this.authForm.value).subscribe({
              next:(res)=>{
                
          this.isLoading=true
                if(res.message=='success'){
                  this.authService.saveToken(res.token)
                    this.router.navigate(['/home'])
                }
              },
              error:(err)=>{
                
                this.resMsg=err.error.message
          this.isLoading=true
                
              }
            })
          }
          
        }
        isShowPass:boolean=true
        showPass(){
this.isShowPass=!this.isShowPass
        }
}
