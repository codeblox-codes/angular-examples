import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  isLoginIn: boolean = false;

  constructor(private authenticationService:AuthenticationService, private formBuilder:FormBuilder, private router:Router){
    this.initializeLoginForm();
  }

  ngOnInit(): void {
  }

  initializeLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')]],
      password: [null, Validators.required],
    })
  }

  get emailControl(){
    return this.loginForm.get('email');
  }

  get passwordControl(){
    return this.loginForm.get('password');
  }

  getFormValues(){
    const email = this.loginForm.get('email')?.value  
    const password = this.loginForm.get('password')?.value  
    return {
      email:email,
      password:password
    };
  }

  login(){
    this.isLoginIn = true;
    const formValues = this.getFormValues();
    this.authenticationService.signIn(formValues.email, formValues.password).then((userCredentials)=>{
      if(!userCredentials.user.emailVerified){
        Swal.fire('Error',"Your email is not verified");
        this.isLoginIn = false;
        this.loginForm.reset();
      }else{
        Swal.fire('Sucess', "You're in 😊")
        this.isLoginIn = false;
        this.loginForm.reset();
        this.router.navigate(['welcome']);
      }
    },
    (error)=>{
      Swal.fire(error?.message)
      this.isLoginIn = false;
    });
  }
}
