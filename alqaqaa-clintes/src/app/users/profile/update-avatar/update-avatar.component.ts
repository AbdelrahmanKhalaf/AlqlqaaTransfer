import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent implements OnInit {
  public imge:File;
  Id;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public size;

  constructor(private auth : UsersServiceService , private router : Router , private route : ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  this.Id = this.route.snapshot.paramMap.get('id')
  
  }
  fileSlecet(event){
    this.imageChangedEvent = event;
    
  }
  imageCropped(event:ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforCrop = this.imageChangedEvent.target.files[0]  
    this.size = fileBeforCrop.size
    this.imge = new File([event.file],fileBeforCrop.name,{type:fileBeforCrop.type})
      }
  fileUpload(){
    const fd = new  FormData();
    fd.append('avatar',this.imge ,this.imge.name )
    this.auth.UpdateUserAvatar( this.Id , fd ).subscribe((res:any)=>{
      this.router.navigate(['/profile'])
    },()=>{})
    
  }
  
}
