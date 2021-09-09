import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { dataSocial } from 'src/app/services/models/dataSocial';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-social',
  templateUrl: './update-social.component.html',
  styleUrls: ['./update-social.component.css']
})
export class UpdateSocialComponent implements OnInit {

  constructor(private auth :UsersServiceService , private route : ActivatedRoute , private router : Router) { }
  public Id ;
  public facbookeM;
  public twitterM;
  public instagramM;
  public googleM;
  public linkedinM;
  public social ;
  ngOnInit(): void {
    this.auth.getUserInf().subscribe((res:any)=>{
      console.log(res);
      this.social = res
      
    },()=>{})
  this.Id = this.route.snapshot.paramMap.get('id')
  }
  updateSocial = new FormGroup({
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    instagram: new FormControl(''),
    google: new FormControl(''),
    linkedin: new FormControl(''),
  });
  get facebook() {
    return this.updateSocial.get("facebook")

  }
  get twitter() {
    return this.updateSocial.get("twitter")

  }
  get instagram() {
    return this.updateSocial.get("instagram")

  }
  get google() {
    return this.updateSocial.get("google")

  }
  get linkedin() {
    return this.updateSocial.get("linkedin")

  }
  saveUpdateSocial(){
    let DataSocial: dataSocial = 
    {
      facebook: this.facebook.value,
      twitter: this.twitter.value,
      instagram: this.instagram.value,
      google: this.google.value,
      linkedin: this.linkedin.value,
    }
    this.auth.UpdateUserScoial(this.Id,DataSocial).subscribe((res:any)=>{
      this.router.navigate(['/profile'])
    },(err)=>{
      console.log(err);
      
    })
  }
}
