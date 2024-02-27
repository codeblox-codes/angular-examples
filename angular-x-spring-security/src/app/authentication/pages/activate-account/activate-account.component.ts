import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit{
  
  accountValidationForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    initFlowbite()
    this.initializeValidationForm()  
  }

  initializeValidationForm(){
    this.accountValidationForm = this.formBuilder.group({
      validationCode: [null, [Validators.required]]
    })
  }

  get validationCodeControl(){
    return this.accountValidationForm.get('validationCode');
  }

  onActivateAccount(){
    const code = this.accountValidationForm.get('validationCode')?.value;
    let validationCode = {
      validationCode: code
    }
    this.authenticationService.activateAccount(validationCode).subscribe((data)=>{      
      alert('Account activated successfully !')
      this.accountValidationForm.reset();
      this.router.navigate(['login']);
    },
    (error)=>{
      console.log(error, "dfffffffff");
      this.accountValidationForm.get('password')?.reset()
    })
  }

}
