import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-orders',
  templateUrl: './details-orders.component.html',
  styleUrls: ['./details-orders.component.css']
})
export class DetailsOrdersComponent implements OnInit {

  constructor(private auth : UsersServiceService , private route : ActivatedRoute) { }
  public Id;
  public data;
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id')
    this.auth.getOrdersBusinessDetails(this.Id).subscribe((res:any)=>{
      console.log(res);
      this.data = res
      
    },(err)=>{console.log(err);
    })
  }

}
