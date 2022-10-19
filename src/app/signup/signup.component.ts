import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl,ValidationErrors ,ValidatorFn,NonNullableFormBuilder} from '@angular/forms';
import { Route } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';


export function passswordMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null=>{
    const password=control.get('password')?.value;
    const confirmPassword=control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return{
        passwordDontMatch: true
      };
    }

    return null;
  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup| any;


  constructor(private authService: AuthenticationService,private toast: HotToastService,private router: Router) {
    this.signUpForm=new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    },{validators: passswordMatchValidator()})
   }

  ngOnInit(): void {
  }

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }
  onSubmit(){
    if(!this.signUpForm.valid)return;
    const{ name, email, password}= this.signUpForm.value;
    this.authService.signUp(name, email, password).pipe(
      this.toast.observe({
        success:'Congrats a new user',
        loading:'Signing in',
        error:({message})=>  `${message}`
      })
    ).subscribe(()=>{
      this.router.navigate(['/login']);
    });

  }


}
