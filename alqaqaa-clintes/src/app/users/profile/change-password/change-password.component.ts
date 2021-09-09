import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ChangePassword } from 'src/app/services/models/ChangePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public errorMessage ;
  public message ;
  public resetLink;
 public errorMessagPad = ''
  constructor(
    private Authservice : UsersServiceService ,
    private router : Router,
    private route : ActivatedRoute,
    @Inject(LOCALE_ID) public local,
  ) { }

  ngOnInit(): void {
  }
newPassForma = new FormGroup ({
  newPass: new FormControl(null, [Validators.required,Validators.maxLength(28),Validators.minLength(8)]),
  password: new FormControl(null, [Validators.required,Validators.maxLength(28),Validators.minLength(8)])
})
  get newPass (){
    return this.newPassForma.get("newPass")
  } 
  get password (){
    return this.newPassForma.get("password")
  } 
  
  saveNewPass(){
    let Cahnge:ChangePassword = {
      password:this.password.value,
      newPass:this.newPass.value,
    }
    this.Authservice.ChangePassword(Cahnge).subscribe(
      (res:any)=>{
        localStorage.removeItem('token');
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000);
        if(res){
          return this.message = res['message_'+this.local];          
        }    
      },(err:any)=>{
        if (err.status === 502) {
          this.errorMessage = err.error
        }
        if (err.status === 400) {
          this.errorMessagPad = err.error["error_"+this.local]
        }
        if (err.status ===404) {
          this.errorMessage = err.error
        }
        if (err.status === 401) {
          this.errorMessage = err.error["error_"+this.local]
        }
      }
    )
  }
}
