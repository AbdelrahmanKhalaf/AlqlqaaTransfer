import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Email } from 'src/app/services/models/email';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AppValidators } from 'src/app/services/models/AppValidators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  public errorMessage;
  public message;
  public token;
  public messageWo;
  public errorMessagePad = '';
  constructor(
    private Authservice: UsersServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) public local,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.Authservice.activatedEmail(this.token).subscribe(
        (res: any) => {
          if (res) {
            this.message = res['message_' + this.local];
            setTimeout(() => {
              let returnUrl = this.route.snapshot.queryParamMap.get(
                'returnUrl'
              );
              this.router.navigate([returnUrl || '/home']);
            }, 9000);
          }
        },
        (err: any) => {
          if (err.status === 502) {
            this.errorMessage = err.error;
          }
          if (err.status === 400) {
            this.errorMessagePad = err.error['error_' + this.local];
          }
          if (err.status === 404) {
            this.errorMessage = err.error;
          }
          if (err.status === 401) {
            this.errorMessage = err.error['error_' + this.local];
          }
        }
      );
    } else {
      this.messageWo = $localize`pleas enter your email to us , we send you link activate your email`;
    }
  }
  ActivateEmail = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
      Validators.email,
    ]),
  });
  get email() {
    return this.ActivateEmail.get('email');
  }
  //this resnd
  ActivatedEmail() {
    let Email: Email = {
      email: this.email.value,
    };
    this.Authservice.resendMessageActivation(Email).subscribe(
      (res: any) => {
        if (res) {
          return (this.message = res['message_' + this.local]);
        }
      },
      (err: any) => {
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error['error_' + this.local];
        }
        if (err.status === 404) {
          this.errorMessage = err.error;
        }
        if (err.status === 401) {
          this.errorMessage = err.error['error_' + this.local];
        }
      }
    );
  }
}
