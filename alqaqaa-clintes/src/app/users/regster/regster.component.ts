import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Iuser } from 'src/app/services/models/Iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { AppValidators } from 'src/app/services/models/AppValidators';

@Component({
  selector: 'app-regster',
  templateUrl: './regster.component.html',
  styleUrls: ['./regster.component.css']
})
export class RegsterComponent implements OnInit {
 public errorMessage = null;
 public message
 public errorMessagePad = ''
  constructor(
    private adminUserServer :UsersServiceService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) public local,
  ) { }

  ngOnInit(): void {
  }
  postUser = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    phone : new FormControl(null,[ Validators.required,Validators.pattern(/[569]\d{11}$/),Validators.minLength(11)]),
    email: new FormControl(null, [Validators.required,Validators.email,AppValidators.acceptEnglisgh]),
    address: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(30)]),
    password: new FormControl(null, [Validators.required,Validators.maxLength(28),Validators.minLength(8),AppValidators.patternValidator(/\d/, { hasNumber: true }),
      AppValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }), 
      AppValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
    ]),
    });
  get name() {
    return this.postUser.get("name")

  }
  get email() {
    return this.postUser.get("email")

  }
  get phone() {
    return this.postUser.get("phone")
  }
  get password() {
    return this.postUser.get("password")
  }
  get address() {
    return this.postUser.get("address")
  }

  PostUser() {
    let DataUser: Iuser = 
    {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
      address : this.address.value,
    }
    this.adminUserServer.PostUser(DataUser).subscribe((res:any)=>{
      this.message = res["message_"+this.local]
      setTimeout(() => {
        this.router.navigate(['/login'])

      }, 9000);
      
      // this.router.navigate(['/activate'])
    },(err:any)=>{
      // err = this.errorMessag  
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
    })
  
  }
}
