import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlqaqaaServiceService } from 'src/app/services/alqaqaa-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-offers',
  templateUrl: './details-offers.component.html',
  styleUrls: ['./details-offers.component.css']
})
export class DetailsOffersComponent implements OnInit {

  public data ; 
  public Id;

  constructor(private alqaqaa : AlqaqaaServiceService , private route : ActivatedRoute ,   
     @Inject(LOCALE_ID) public local,
  ) { }

  ngOnInit(): void {
  
    this.Id = this.route.snapshot.paramMap.get('id')
    this.alqaqaa.getOffersPro(this.Id).subscribe((res)=>{
      this.data = res
      
    })
  }

}
