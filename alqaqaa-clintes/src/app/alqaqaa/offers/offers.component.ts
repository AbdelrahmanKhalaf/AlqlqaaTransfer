import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { AlqaqaaServiceService } from 'src/app/services/alqaqaa-service.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdataOffers } from 'src/app/services/models/IdataOffer';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { timeStamp } from 'console';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  public offers;
  public messageOffers;
  public errorMessageoffers;
  public title
  /**
   * name
   */
  public CatgServices : any[] = []
    
  
  addOffers = new FormGroup({
    offersId: new FormControl('', [Validators.required,]),
    addressOffers: new FormControl('', [Validators.required,]),
  });
  get offersId() {
    return this.addOffers.get("offersId")
  }
  get addressOffers() {
    return this.addOffers.get("addressOffers")
  }
  getTocken (){
    return localStorage.getItem('token')
  }
  constructor(
    private  alqaqaaServises : AlqaqaaServiceService , 
    private router : Router , 
    private  route : ActivatedRoute ,
     private ServiceUser : UsersServiceService,
     private titleService: Title,
     @Inject(LOCALE_ID) public local,
     ) { }

  ngOnInit(): void {
    
    this.alqaqaaServises.getCatgServices().subscribe((res:any)=>{
      res.forEach(element => {
        this.CatgServices.push(element.name_ar)
      });     
    })
    this.alqaqaaServises.getOffers().subscribe((res: any) => {
      this.offers = res 

    }, (err) => {
      console.error(err);
    })
}

  saveAddOffers() {
    let addOffers:IdataOffers =
    {
      offersId: this.offersId.value,
      addressOffers : this.addressOffers.value
    }
    this.ServiceUser.AddOrdersOffers(addOffers).subscribe((res:any) => {
      
      this.messageOffers = res['message_'+this.local]
    }, (err) => {
      if (err.status === 401) {
        this.errorMessageoffers = err.error
      }
      if (err.status === 400) {
        this.errorMessageoffers = err.error
      }
      if (err.status === 403) {
        this.errorMessageoffers = err.error
      }
      if (err.status === 500) {
        this.errorMessageoffers = err.error
      }
      if (err.status === 4040) {
        this.errorMessageoffers = err.error
      }
      
    })
  }

}
