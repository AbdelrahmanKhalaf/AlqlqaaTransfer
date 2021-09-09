import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { AppValidators } from 'src/app/services/models/AppValidators';
import { Email } from 'src/app/services/models/email';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public errorMessage ;
  public message ;
  constructor(
    private Authservice : UsersServiceService ,
    private router : Router,
    private route : ActivatedRoute,
    @Inject(LOCALE_ID) public local,

  ) { }

  ngOnInit(): void {
  }
  EmailForgetPassword = new FormGroup ({
    email: new FormControl(null, [Validators.required,Validators.email,AppValidators.acceptEnglisgh,Validators.email]),
  })
  get email (){
    return this.EmailForgetPassword.get("email")
  } 
  
  saveEmail(){
    let Email:Email = {
      email:this.email.value,
    }
    this.Authservice.forgetPassword(Email).subscribe(
      (res:any)=>{
        if(res){
          
          return this.message = res['message_'+this.local]
        }
        
      },(err:any)=>{
        if (err.status === 502) {
          this.errorMessage = err.error
        }
        if (err.status === 400) {
          this.errorMessage = err.error["error_"+this.local]
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
