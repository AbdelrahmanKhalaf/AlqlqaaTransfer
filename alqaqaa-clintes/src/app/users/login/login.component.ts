import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { IUserLogin } from 'src/app/services/models/IUserLogin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/services/models/AppValidators';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage = ""
  public accessToken = ""
  public location : Location
  constructor(
    private Authservice: UsersServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) public local,
  ) { }

  ngOnInit(): void {
  }
  formLogin = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, AppValidators.acceptEnglisgh, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(28), Validators.minLength(8)])
  })
  get email() {
    return this.formLogin.get("email")
  }
  get password() {
    return this.formLogin.get("password")
  }
  saveLogin() {
    let UserLogin: IUserLogin = {
      email: this.email.value,
      password: this.password.value,
    }
    this.Authservice.makeUserLogin(UserLogin).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.bearer)
        this.accessToken = res.bearer
        if (res) {
          let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl")
          this.router.navigate([returnUrl || '/home'])
         
        }
      }, (err: any) => {
        if (err.status === 502) {
          this.errorMessage = err.error
        }
        if (err.status === 500) {
          this.errorMessage = err.error
        }
        if (err.status === 400) {
          this.errorMessage = err.error['error_'+this.local]
        }
        if (err.status === 404) {
          this.errorMessage = err.error
        }
        if (err.status === 401) {
          this.errorMessage = err.error
        }
      }
    )
  }
}
