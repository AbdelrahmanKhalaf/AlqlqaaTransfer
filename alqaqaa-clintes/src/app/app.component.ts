import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, Event, NavigationStart } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UsersServiceService } from './services/users-service.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoadingIndicatir = true
  private locale: string;
  title = 'Alqaqa';
  public massege
  constructor(private route: ActivatedRoute,
    @Inject(LOCALE_ID) locale: string,
    private auth: UsersServiceService,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document) {
    this.locale = locale;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.showLoadingIndicatir = true
      }
      if (event instanceof NavigationEnd) {
        this.showLoadingIndicatir = false
      }
    })
  }
  ngOnInit(): void {
    this.auth.getUserInf().subscribe((res: any) => {
      if (res.verify === false) {
        this.massege = $localize`Please Activate Your Email`
      }
    })
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationEnd:
          this.titleService.setTitle(this.route.firstChild.snapshot.data['title_' + this.locale])
        
          break;
        default:
          break;
      }
    })

  }

}

