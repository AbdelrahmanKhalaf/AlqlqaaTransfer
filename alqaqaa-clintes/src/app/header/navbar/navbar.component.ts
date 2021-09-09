import { Component, OnInit, PLATFORM_ID, LOCALE_ID, Inject } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { environment } from '../../../environments/environment';
import {DOCUMENT, Location} from "@angular/common";
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentLanguage;
  location: Location;
  constructor(private Auth : UsersServiceService,
    private router : Router,
    @Inject(PLATFORM_ID)private platformId,
    @Inject(DOCUMENT) private document,
    @Inject(LOCALE_ID) private localId,) { 
      this.currentLanguage = localId;
      localStorage.setItem('locale', localId);

    }

  changeLanguageTo(language: string) {
    localStorage.setItem('locale', language);
    const date = new Date();
    date.setTime(date.getTime() + (100 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    this.document.cookie =  'lang=' + language  + ';' + expires + ';path=/';
    console.log(this.document.cookie);
    if (language === 'ar' || language === 'en') {
      this.localId = language;
      if (language === 'ar' ) {

        window.location.href = `${environment.frontendUrl}${language}${this.router.url.replace('en', '')}`;
      } else if (language === 'en') {
        window.location.href = `${environment.frontendUrl}${language}${this.router.url.replace('ar', '')}`;
      }
    } else {
      localStorage.setItem('locale', 'en');
      const date = new Date();
      date.setTime(date.getTime() + (100 * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + date.toUTCString();
      this.document.cookie =  'lang=en;' + expires + ';path=/';
      window.location.href = `${environment.frontendUrl}${language}${this.router.url.replace('ar', '')}`;
    }
  }
  ngOnInit(): void {
  }
  login(){
    return this.Auth.getToken()
  }
  logout(){
     this.Auth.loguotuser()
    
  }
}
