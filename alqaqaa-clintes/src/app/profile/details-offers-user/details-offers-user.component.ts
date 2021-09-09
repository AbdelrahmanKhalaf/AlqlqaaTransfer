import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-offers-user',
  templateUrl: './details-offers-user.component.html',
  styleUrls: ['./details-offers-user.component.css']
})
export class DetailsOffersUserComponent implements OnInit {

  constructor(private auth : UsersServiceService , private route : ActivatedRoute) { }
  public Id;
  public data;
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id')
    this.auth.getOrdersOffersDetails(this.Id).subscribe((res:any)=>{
      this.data = res
      
    },(err)=>{;
    })
  }
}
