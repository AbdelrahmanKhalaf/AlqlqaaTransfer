import { Injectable } from '@angular/core';
import { UsersServiceService } from './users-service.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GurdAdminService {

  public actvition;
  constructor(private auth :UsersServiceService , private router : Router) { }
  canActivate(route , state:RouterStateSnapshot){
    this.auth.getUserInf().subscribe((res:any)=>{
      if (res.verify === true) return true;
      this.router.navigate(['activate'],{queryParams:{returnUrl : state.url}})
    })
    return true 
  }
}
