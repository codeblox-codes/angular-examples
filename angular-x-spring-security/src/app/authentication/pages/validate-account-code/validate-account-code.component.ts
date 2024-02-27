import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-validate-account-code',
  templateUrl: './validate-account-code.component.html',
  styleUrls: ['./validate-account-code.component.scss']
})
export class ValidateAccountCodeComponent implements OnInit{
  
  accountValidationCodeForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    initFlowbite()
    this.initializeValidationCodeForm()  
  }

  initializeValidationCodeForm(){
    this.accountValidationCodeForm = this.formBuilder.group({
      code: [null, [Validators.required]]
    })
  }

  get codeControl(){
    return this.accountValidationCodeForm.get('code');
  }

  onSendValidationCode(){
    let code = {
      code: this.accountValidationCodeForm.get('code')?.value
    }
    this.authenticationService.validatePasswordModificationCode(code).subscribe((data)=>{      
      alert('Code validated !')
      this.accountValidationCodeForm.reset();
      this.router.navigate(['modify-password']);
    },
    (error)=>{
      console.log(error, "dfffffffff");
      this.accountValidationCodeForm.reset();
    })
  }

}
