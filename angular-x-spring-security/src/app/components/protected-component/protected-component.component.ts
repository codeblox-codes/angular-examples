import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-protected-component',
  templateUrl: './protected-component.component.html',
  styleUrls: ['./protected-component.component.scss']
})
export class ProtectedComponentComponent implements OnInit{
  dataToDisplay: any;
  
  
  constructor(private authenticationService:AuthenticationService, private router:Router){}

  
  ngOnInit(): void {
    this.authenticationService.accessProtectedData().subscribe(
      (data) => {
        this.dataToDisplay = data?.content;
        alert("Welcome");      
      },
      (error) => {
        console.error('Error occurred:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Response body:', error.error);
        }      
      }
    )
  }

  onLogout(){
    this.authenticationService.logout().subscribe((success)=>{
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.router.navigate(['/login'])
    });
  }
}
