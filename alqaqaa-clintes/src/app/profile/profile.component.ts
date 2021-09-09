import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlqaqaaServiceService } from '../services/alqaqaa-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public dataUs;
  public erorrma;
  public errorWri;
  public facbookeM;
  public twitterM;
  public instagramM;
  public googleM;
  public linkedinM;
  public social;
  public Id;
  public fliterRa;
  public dataOffers
  public dataBusiness;
  public message;
  test;
  userType;
  public errorMessage;

  constructor(private auth: UsersServiceService, private route: ActivatedRoute, private alqaqaa: AlqaqaaServiceService, private router: Router, private location: Location,
    @Inject(LOCALE_ID) public local,private titleService :Title

  ) { }
  deletOffers = new FormGroup({
    id: new FormControl('', [Validators.required,]),
  });

  get id() {
    return this.deletOffers.get('id')
  }

  ngOnInit(): void {
    this.auth.getUserInf().subscribe((data: any) => {
      this.dataUs = data
      this.facbookeM = this.dataUs.facebook
      this.twitterM = this.dataUs.twitter
      this.instagramM = this.dataUs.instagram
      this.googleM = this.dataUs.google
      this.linkedinM = this.dataUs.linkedin
      this.social = this.facbookeM + this.googleM + this.instagramM + this.twitterM + this.linkedinM;
    }, (err: any) => {
      this.erorrma = err.error
      if (err.error) this.errorWri = "You are not registered with us or you are not logged in with us";
      return this.errorWri

    })
    this.auth.getOrdersOffers().subscribe((res: any) => {
      this.dataOffers = res
    })
    this.auth.getOrdersBusiness().subscribe((res: any) => {
      this.dataBusiness = res
    })

  }
  deleteOrderOffers(id) {
    this.auth.deletOrdersOffers(id).subscribe((res: any) => {
      this.message = res["message_"+this.local]
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([decodeURI(this.location.path())]
          )
        })
      }, 2000);


    }, (err) => {
      if (err.status === 401) {
        this.errorMessage = err.error
      }
      if (err.status === 400) {
        this.errorMessage = err.error
      }
      if (err.status === 500) {
        this.errorMessage = err.error
      }
      if (err.status === 404) {
        this.errorMessage = err.error
      }
      if (err.status === 502) {
        this.errorMessage = err.error
      }
      if (err.status === 403) {
        this.errorMessage = err.error
      };
    })
  }
  deleteOrderBusiness(id) {
    this.auth.deletOrdersBusiness(id).subscribe((res: any) => {
      this.message = res["message_"+this.local]
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([decodeURI(this.location.path())]
          )
        })
      }, 2000)
    }, (err) => {
      if (err.status === 401) {
        this.errorMessage = err.error
      }
      if (err.status === 400) {
        this.errorMessage = err.error
      }
      if (err.status === 500) {
        this.errorMessage = err.error
      }
      if (err.status === 404) {
        this.errorMessage = err.error
      }
      if (err.status === 502) {
        this.errorMessage = err.error
      }
      if (err.status === 403) {
        this.errorMessage = err.error
      };
    })
  }

}
