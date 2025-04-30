import { AbstractControl } from "@angular/forms";

export const passwordMatch=(control:AbstractControl)=>{
    let password= control.get('password')?.value;
    let rePassword= control.get('rePassword')?.value;
    if (password === rePassword){
      return null
    }else{
      return {
        missmatch:true
      }
    }
  }