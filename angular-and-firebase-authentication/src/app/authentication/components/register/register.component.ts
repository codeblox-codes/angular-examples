import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registrationForm!:FormGroup;
  isCreatingAccount: boolean = false;

  constructor(private authenticationService:AuthenticationService, private formBuilder:FormBuilder, private router:Router){
    this.initializeRegistrationForm();
  }

  ngOnInit(): void {
  }

  initializeRegistrationForm(){
    this.registrationForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')]],
      password: [null, Validators.required],
      passwordAgain: [null, Validators.required],
    })
  }

  get emailControl(){
    return this.registrationForm.get('email');
  }

  get passwordControl(){
    return this.registrationForm.get('password');
  }

  get passwordAgainControl(){
    return this.registrationForm.get('passwordAgain');
  }

  getFormValues(){
    const email = this.registrationForm.get('email')?.value  
    const password = this.registrationForm.get('password')?.value  
    const passwordAgain = this.registrationForm.get('passwordAgain')?.value  
    return {
      email:email,
      password:password,
      passwordAgain:passwordAgain
    };
  }

  register(){
    this.isCreatingAccount = true;
    const formValues = this.getFormValues();
    if(formValues.password != formValues.passwordAgain){
      Swal.fire('Error',"The passwords don't macth !", 'error');
      this.isCreatingAccount = false;
    }else{
      this.authenticationService.signUp(formValues.email, formValues.password).then((userCredentials)=>{
        const user = userCredentials.user;
        user?.sendEmailVerification().then((success)=>{
          Swal.fire('Success', 'Verification email sent !', 'success');
          this.registrationForm.reset();
          this.isCreatingAccount = false;
        })
        .catch((error)=>{
          Swal.fire('Error', 'Something went wrong !', 'error');
          this.registrationForm.reset();
        })
      },
      (error)=>{
        Swal.fire('Error', error?.message, 'error');
        this.isCreatingAccount = false;
      });
    }
  }

}
