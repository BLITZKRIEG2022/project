import { Injectable } from '@angular/core';
import{Auth,signInWithEmailAndPassword} from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$= authState(this.auth);

  constructor(private auth: Auth) { }
  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));

  }
  signUp(name:any, email: any, password: any){
    return  from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({user})=> updateProfile(user,{displayName:name}))
    )
    
  }

  logout(){
    return from(this.auth.signOut());
  }
}
