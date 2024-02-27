import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { ValidateAccountCodeComponent } from './pages/validate-account-code/validate-account-code.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    ValidateAccountCodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
