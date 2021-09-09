import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, TRANSLATIONS } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BusinessComponent } from './alqaqaa/business/business.component';
import { OffersComponent } from './alqaqaa/offers/offers.component';
import { AboutUSComponent } from './alqaqaa/about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { NotFondComponent } from './not-fond/not-fond.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { FooterComponent } from './header/footer/footer.component';
import { RegsterComponent } from './users/regster/regster.component';
import { LoginComponent } from './users/login/login.component';
import { GetInfComponent } from './users/profile/get-inf/get-inf.component';
import { UpdateInfComponent } from './users/profile/update-inf/update-inf.component';
import { DleatInfComponent } from './users/profile/dleat-inf/dleat-inf.component';
import { UpdateAvatarComponent } from './users/profile/update-avatar/update-avatar.component';
import { SupportersComponent } from './alqaqaa/supporters/supporters.component';
import { authInterceptor } from './services/models/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { UpdateSocialComponent } from './users/profile/update-social/update-social.component';
import { DetailsOffersComponent } from './alqaqaa/details-offers/details-offers.component';
import { DetailsBusinessComponent } from './alqaqaa/details-business/details-business.component';
import { DetailsServicesComponent } from './alqaqaa/details-services/details-services.component';
import { DetailsOrdersComponent } from './profile/details-orders/details-orders.component';
import { DetailsOffersUserComponent } from './profile/details-offers-user/details-offers-user.component';
import { AuthGurde } from './services/auth-gurde.service';
import { GurdAdminService } from './services/gurd-admin.service';
import { TestPipe } from './pipe/test.pipe';
import { OurServicesComponent } from './alqaqaa/our-services/our-services.component';
import { ForgetPasswordComponent } from './users/profile/forget-password/forget-password.component';
import { ResetPasswordComponent } from './users/profile/reset-password/reset-password.component';
import { ChangePasswordComponent } from './users/profile/change-password/change-password.component';
import { ActivateComponent } from './users/profile/activate/activate.component';
import { AboutuComponent } from './alqaqaa/aboutu/aboutu.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FilterPipe } from './pipe/filter.pipe';
declare const require; // Use the require method provided by webpack
@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    OffersComponent,
    AboutUSComponent,
    HomeComponent,
    NotFondComponent,
    NavbarComponent,
    FooterComponent,
    RegsterComponent,
    LoginComponent,
    GetInfComponent,
    UpdateInfComponent,
    DleatInfComponent,
    UpdateAvatarComponent,
    SupportersComponent,
    ProfileComponent,
    UpdateSocialComponent,
    DetailsOffersComponent,
    DetailsBusinessComponent,
    DetailsServicesComponent,
    DetailsOrdersComponent,
    DetailsOffersUserComponent,
    TestPipe,
    OurServicesComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ActivateComponent,
    AboutuComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ImageCropperModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },

    AuthGurde,
    GurdAdminService,
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'en';
        return require(`raw-loader!local/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
