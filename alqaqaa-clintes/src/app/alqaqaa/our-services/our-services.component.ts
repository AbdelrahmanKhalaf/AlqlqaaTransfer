import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { AlqaqaaServiceService } from 'src/app/services/alqaqaa-service.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  constructor( private alqaqaaServises : AlqaqaaServiceService,   
    @Inject(LOCALE_ID) public local,
  ) { }
  public services;
  ngOnInit(): void {
    this.alqaqaaServises.getServices().subscribe((res: any) => {
      this.services = res
      
    }, (err) => {
      console.error(err);
    });
  }

}
