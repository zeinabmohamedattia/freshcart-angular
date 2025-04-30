import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { AuthService } from '../../services/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';
import { passwordMatch } from '../../../../shared/helpers/password-match';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  resMsg: string = ''
  isLoading: boolean = true
  authForm!: FormGroup
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  formInit() {
    this.authForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    }, { validators: [passwordMatch] });
  }
  ngOnInit(): void {
    this.formInit()
  }
  submitForm() {
    this.isLoading = false
    if (this.authForm.valid || !this.isLoading) {

      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {

          this.isLoading = true
          if (res.message == 'success') {
            this.router.navigate(['/login'])
          }
        },
        error: (err) => {

          this.resMsg = err.error.message
          this.isLoading = true

        }
      })
    }

  }


}
