import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  loginForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router){}

  ngOnInit(): void {
    this.initializeLoginForm()  
  }

  initializeLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')]],
      password: [null, [Validators.required]]
    })
  }

  get usernameControl(){
    return this.loginForm.get('username');
  }

  get passwordControl(){
    return this.loginForm.get('password');
  }

  onLogin(){
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authenticationService.login(username, password).subscribe((data)=>{
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.token);      
      alert('Logged in successfully !')
      this.loginForm.reset();
      this.router.navigate(['protected-data']);
    },
    (error)=>{
      console.log(error, "dfffffffff");
      
      alert(error[0]?.message)
      this.loginForm.get('password')?.reset()
    })
  }

}
