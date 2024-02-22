import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit{
  
  registrationForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    this.initializeRegistrationForm()  
  }

  initializeRegistrationForm(){
    this.registrationForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')]],
      password: [null, [Validators.required]]
    })
  }

  get nameControl(){
    return this.registrationForm.get('name');
  }

  get usernameControl(){
    return this.registrationForm.get('username');
  }

  get passwordControl(){
    return this.registrationForm.get('password');
  }

  onRegister(){
    const name = this.registrationForm.get('name')?.value;
    const username = this.registrationForm.get('username')?.value;
    const password = this.registrationForm.get('password')?.value;
    let user = {
      name: name,
      username: username,
      password: password
    }
    this.authenticationService.register(user).subscribe((success)=>{
      alert('Registration successful !')
      this.registrationForm.reset();
      this.router.navigate(['activate-account']);
    },
    (error)=>{
      alert(error)
      this.registrationForm.get('password')?.reset()
    })
  }

}
