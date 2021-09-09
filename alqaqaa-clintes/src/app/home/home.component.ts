import { Component, OnInit, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { UsersServiceService } from '../services/users-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EvaluationI } from '../services/models/evaluation';
import { AlqaqaaServiceService } from '../services/alqaqaa-service.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart ,Event} from '@angular/router';
import { IdataOffers } from '../services/models/IdataOffer';
import { IdataBusiness } from '../services/models/dataBusiness';
import { Location } from '@angular/common';
import { IFeedback } from '../services/models/feedback';
import { AppValidators } from '../services/models/AppValidators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public services;
  showLoadingIndicatir = true
  public busniess;
  public offers;
  public catgServices = []
  public dataUs;
  public testmonils = [];
  public errorMessage ;
  public messageOffers;
  public errorMessageoffers;
  public messageBusiness;
  public errorMessageBusiness;
  public message;
  addOffers = new FormGroup({
    offersId: new FormControl('', [Validators.required,]),
    addressOffers: new FormControl('', [Validators.required,]),
  });
  addBusiness = new FormGroup({
    businessId: new FormControl('', [Validators.required,]),
    address: new FormControl('', [Validators.required,]),
  });
  constructor(
    private ServiceUser: UsersServiceService, 
    private alqaqaaServises: AlqaqaaServiceService, 
    private router: Router , 
    private location : Location,
    private route : ActivatedRoute,
    @Inject(LOCALE_ID) public local,
   ) {
  
   }
  get offersId() {
    return this.addOffers.get("offersId")
  }
  get addressOffers() {
    return this.addOffers.get("addressOffers")
  }
   get businessId() {
    return this.addBusiness.get("businessId")
  }
   get address() {
    return this.addBusiness.get("address")
  }
 
  ngOnInit(): void {
    this.alqaqaaServises.getServices().subscribe((res: any) => {
      this.services = res
    }, (err) => {
    });

    this.alqaqaaServises.getBusines().subscribe((res: any) => {      
      this.busniess = res
    }, (err) => {
    });

    this.alqaqaaServises.getOffers().subscribe((res: any) => {
      this.offers = res 
    }, (err) => {
    })
    // get info user 
    // this.ServiceUser.getUserInf().subscribe((res: any) => {
    //   this.dataUs = res
    // }, (err) => {
    //   if (err.status === 401) {
    //     this.errorMessage =  err.error["error_"+this.local]
    //   }
    // })

  }
  getTocken (){
    return localStorage.getItem('token')
  }

  saveAddOffers() {
    let addOffers:IdataOffers =
    {
      offersId: this.offersId.value,
      addressOffers : this.addressOffers.value
    }
    this.ServiceUser.AddOrdersOffers(addOffers).subscribe((res:any) => {
      this.messageOffers = res["message_"+this.local]
    }, (err) => {
      if (err.status === 401) {
        this.errorMessageoffers = err.error["error_"+this.local]
      }
      if (err.status === 400) {
        this.errorMessageoffers =  err.error["error_"+this.local]
      }
      if (err.status === 403) {
        this.errorMessageoffers =  err.error
      }
      if (err.status === 500) {
        this.errorMessageoffers = err.error
      }
      if (err.status === 404) {
        this.errorMessageoffers =  err.error
      }      
    })
  }
  saveAddBusiness() {
    let addBusiness : IdataBusiness =
    {
      businessId: this.businessId.value,
      address : this.address.value
    }
    this.ServiceUser.AddOrdersBusiness(addBusiness).subscribe((res:any) => {
      this.messageBusiness =   res["message_"+this.local]
    }, (err) => {
      if (err.status === 401) {
        this.errorMessageBusiness = err.error["error_"+this.local]
      }
      if (err.status === 400) {
        this.errorMessageBusiness =  err.error["error_"+this.local]
      }
      if (err.status === 403) {
        this.errorMessageBusiness = err.error
      }
      if (err.status === 500) {
        this.errorMessageBusiness =  err.error
      }
      if (err.status === 404) {
        this.errorMessageBusiness = err.error
      }      
    })
  }

}
