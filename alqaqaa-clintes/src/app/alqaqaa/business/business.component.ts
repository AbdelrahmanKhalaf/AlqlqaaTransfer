import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlqaqaaServiceService } from 'src/app/services/alqaqaa-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IdataBusiness } from 'src/app/services/models/dataBusiness';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  public busniess :Array<any>
  public name
  public busniessSor :Array<any>;
  public errorMessageBusiness;
  public messageBusiness;
  addBusiness = new FormGroup({
    businessId: new FormControl('', [Validators.required,]),
    address: new FormControl('', [Validators.required,]),
  });
  constructor(private alqaqaaServises :AlqaqaaServiceService , private ServiceUser : UsersServiceService , 
    private router : Router,private route : ActivatedRoute, @Inject(LOCALE_ID) public local, ) { }
  get businessId() {
    return this.addBusiness.get("businessId")
  }
   get address() {
    return this.addBusiness.get("address")
  }
  getTocken (){
    return localStorage.getItem('token')
  }
  ngOnInit(): void {
    this.alqaqaaServises.getBusines().subscribe((res: any) => {
      this.busniess = res 
      
    }, (err) => {
    });
  }
  saveAddBusiness() {
    let addBusiness : IdataBusiness =
    {
      businessId: this.businessId.value,
      address : this.address.value
    }
    this.ServiceUser.AddOrdersBusiness(addBusiness).subscribe((res:any) => {
      this.messageBusiness = res['message_'+this.local]

    }, (err) => {

      if (err.status === 401) {
        this.errorMessageBusiness = err.error["error_"+this.local]
      }
      if (err.status === 400) {
        this.errorMessageBusiness = err.error["error_"+this.local]
      }
      if (err.status === 403) {
        this.errorMessageBusiness = err.error
      }
      if (err.status === 500) {
        this.errorMessageBusiness = err.error
      }
      if (err.status === 404) {
        this.errorMessageBusiness = err.error
      }
      
    })
  }

}
