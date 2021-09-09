import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateInfo } from 'src/app/services/models/updateInfo';

@Component({
  selector: 'app-update-inf',
  templateUrl: './update-inf.component.html',
  styleUrls: ['./update-inf.component.css']
})
export class UpdateInfComponent implements OnInit {
  public errorMessage = null;
  public DataUser
  constructor(
    private adminUserServer :UsersServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.adminUserServer.getUserInf().subscribe((res:any)=>{
      console.log(res);
      this.DataUser = res
    },(err)=>
    {
      console.error(err);
      
    })
  }
  UpdateUser = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(315)]),
    phone : new FormControl(null,[ Validators.required,Validators.pattern(/[569]\d{11}$/),Validators.minLength(11)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(315)]),
    });
  get name() {
    return this.UpdateUser.get("name")

  }
  get phone() {
    return this.UpdateUser.get("phone")
  }
  
  get address() {
    return this.UpdateUser.get("address")
  }

 PutUser() {
    let DataUser: UpdateInfo = 
    {
      name: this.name.value,
      phone: this.phone.value,
      address : this.address.value,
    }
    this.adminUserServer.updateInfo(DataUser).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/profile'])
    },(err:any)=>{
      // err = this.errorMessage
      if (err.status === 502) {
        this.errorMessage = err.error
      }
      if (err.status === 500) {
        this.errorMessage = err.error
      }
      if (err.status === 400) {
        this.errorMessage = err.error
      }
    })
  }

}
