import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { AlqaqaaServiceService } from 'src/app/services/alqaqaa-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-services',
  templateUrl: './details-services.component.html',
  styleUrls: ['./details-services.component.css']
})
export class DetailsServicesComponent implements OnInit {
  public data ; 
  public Id;
  constructor(private alqaqaa : AlqaqaaServiceService , private route : ActivatedRoute,@Inject(LOCALE_ID) public local,
  ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id')
    this.alqaqaa.getServicesDetails(this.Id).subscribe((res)=>{
      this.data = res
      
    })
  }

}
