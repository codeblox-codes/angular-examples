import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit{
  
  updateUserForm!:FormGroup;
  hidePassword: boolean = true;

  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    initFlowbite()
    this.initializeValidationCodeForm()  
  }

  initializeValidationCodeForm(){
    this.updateUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')]],
      password: [null, [Validators.required]]
    })
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get passwordControl(){
    return this.updateUserForm.get('password');
  }

  get usernameControl(){
    return this.updateUserForm.get('username');
  }

  onUpdateUser(){
    let user = {
      username: this.updateUserForm.get('username')?.value,
      password: this.updateUserForm.get('password')?.value
    }
    this.authenticationService.updateUser(user).subscribe((data)=>{      
      alert('User updated !')
      this.updateUserForm.reset();
      this.router.navigate(['login']);
    },
    (error)=>{
      console.log(error, "dfffffffff");
      this.updateUserForm.reset();
    })
  }

}
