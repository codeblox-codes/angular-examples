import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  
  accountPasswordForgottenForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    initFlowbite()
    this.initializePasswordForgottenForm()  
  }

  initializePasswordForgottenForm(){
    this.accountPasswordForgottenForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')]]
    })
  }

  get emailControl(){
    return this.accountPasswordForgottenForm.get('email');
  }

  onSendValidationCode(){
    let email = {
      email: this.accountPasswordForgottenForm.get('email')?.value
    }
    this.authenticationService.forgotPassword(email).subscribe((data)=>{      
      alert('Email sent !')
      this.accountPasswordForgottenForm.reset();
      this.router.navigate(['validation-code']);
    },
    (error)=>{
      console.log(error, "dfffffffff");
      this.accountPasswordForgottenForm.reset();
    })
  }

}
