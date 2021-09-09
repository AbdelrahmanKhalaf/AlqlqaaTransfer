import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/services/models/AppValidators';
import { IFeedback } from 'src/app/services/models/feedback';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUSComponent implements OnInit {
public errorMessage;
public message
  constructor(private auth : UsersServiceService,
    private router : Router,
    private location : Location,
    ) { }
  formfeedback = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
    des: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(315)]),
    subject: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
    email: new FormControl(null, [Validators.required,Validators.email,AppValidators.acceptEnglisgh]),
  })
  get email (){
    return this.formfeedback.get("email")
  }
  get name (){
    return this.formfeedback.get("name")
  }
  get des (){
    return this.formfeedback.get("des")
  }
  get subject (){
    return this.formfeedback.get("subject")
  }
  feedbackSend(){
    let feedbackData : IFeedback = {
      email : this.email.value,
      name : this.name.value,
      des : this.des.value,
      subject : this.subject.value,
    }
    this.auth.feedback(feedbackData).subscribe((res:any)=>{
      if(res){
        setTimeout(() => {
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.router.navigate([decodeURI(this.location.path())])})             
        }, 3000);
      }
        this.message = res.message
    
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
      if (err.status === 404) {
        this.errorMessage = err.error
      }
      if(err){
        this.errorMessage = err.error.error
      }
    })
  }
  ngOnInit(): void {
  }

}
