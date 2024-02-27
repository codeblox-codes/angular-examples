import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login.component';
import { RegisterComponent } from './authentication/pages/register/register.component';
import { ProtectedComponentComponent } from './components/protected-component/protected-component.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { ActivateAccountComponent } from './authentication/pages/activate-account/activate-account.component';
import { ForgotPasswordComponent } from './authentication/pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './authentication/pages/update-password/update-password.component';
import { ValidateAccountCodeComponent } from './authentication/pages/validate-account-code/validate-account-code.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'validation-code',
    component: ValidateAccountCodeComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'modify-password',
    component: UpdatePasswordComponent
  },
  {
    path: 'protected-data',
    component: ProtectedComponentComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
