import { Injectable } from '@angular/core';
import { UsersServiceService } from './users-service.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGurde {

  constructor(private auth :UsersServiceService , private router : Router) { }
  canActivate(route , state:RouterStateSnapshot){
    if (this.auth.getToken()) return true;
    this.router.navigate(['login'],{queryParams:{returnUrl : state.url}})
    return true 
  }
  
}
