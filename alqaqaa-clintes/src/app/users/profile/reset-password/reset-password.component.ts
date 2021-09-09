import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewPass } from 'src/app/services/models/newPass';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from 'src/app/services/models/AppValidators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public errorMessage ;
  public message ;
  public resetLink;
  errorMessagePad = ''
  constructor(
    private Authservice : UsersServiceService ,
    private router : Router,
    private route : ActivatedRoute,
    @Inject(LOCALE_ID) public local,

  ) { }

  ngOnInit(): void {
    this.resetLink = this.route.snapshot.paramMap.get('resetLink')
  }
newPassForma = new FormGroup ({
  newPass: new FormControl(null, [Validators.required,Validators.maxLength(28),Validators.minLength(8)])
})
  get newPass (){
    return this.newPassForma.get("newPass")
  } 
  
  saveNewPass(){
    let newPass:NewPass = {
      newPass:this.newPass.value,
    }
    this.Authservice.RestPassword(this.resetLink,newPass).subscribe(
      (res:any)=>{
        if(res){
          return this.message = res['message_'+this.local]
        }
        
      },(err:any)=>{
        if (err.status === 502) {
          this.errorMessage = err.error
        }
        if (err.status === 400) {
          this.errorMessagePad = err.error["error_"+this.local]
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
