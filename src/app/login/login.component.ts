import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'material-login';
  
  
  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private toast: HotToastService
        
    
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
   }
  ngOnInit(): void {
  }
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    const{email,password}=this.loginForm.value;
    this.authService.login(email,password).pipe(
      this.toast.observe({
        success: 'Logged in successfully!',
        loading: 'Loading...',
        error: 'Wrong credentials!'
      })
    ).subscribe(()=>{
      this.router.navigate(['/user']);

    });
    
    
  }
}
