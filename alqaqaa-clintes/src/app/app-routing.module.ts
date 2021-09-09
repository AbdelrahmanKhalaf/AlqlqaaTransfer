import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetInfComponent } from './users/profile/get-inf/get-inf.component';
import { NotFondComponent } from './not-fond/not-fond.component';
import { FooterComponent } from './header/footer/footer.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { OffersComponent } from './alqaqaa/offers/offers.component';
import { BusinessComponent } from './alqaqaa/business/business.component';
import { AboutUSComponent } from './alqaqaa/about-us/about-us.component';
import { RegsterComponent } from './users/regster/regster.component';
import { LoginComponent } from './users/login/login.component';
import { UpdateAvatarComponent } from './users/profile/update-avatar/update-avatar.component';
import { UpdateInfComponent } from './users/profile/update-inf/update-inf.component';
import { DleatInfComponent } from './users/profile/dleat-inf/dleat-inf.component';
import { SupportersComponent } from './alqaqaa/supporters/supporters.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateSocialComponent } from './users/profile/update-social/update-social.component';
import { DetailsBusinessComponent } from './alqaqaa/details-business/details-business.component';
import { DetailsServicesComponent } from './alqaqaa/details-services/details-services.component';
import { DetailsOffersComponent } from './alqaqaa/details-offers/details-offers.component';
import { DetailsOrdersComponent } from './profile/details-orders/details-orders.component';
import { DetailsOffersUserComponent } from './profile/details-offers-user/details-offers-user.component';
import { AuthGurde } from './services/auth-gurde.service';
import { OurServicesComponent } from './alqaqaa/our-services/our-services.component';
import { ResetPasswordComponent } from './users/profile/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './users/profile/forget-password/forget-password.component';
import { ChangePasswordComponent } from './users/profile/change-password/change-password.component';
import { ActivateComponent } from './users/profile/activate/activate.component';
import { GurdAdminService } from './services/gurd-admin.service';
import { AboutuComponent } from './alqaqaa/aboutu/aboutu.component';


const routes: Routes = [
  { path: '', component: HomeComponent,data: {title_en: 'Alqaqaa | Best moving company', title_ar: 'القعقاع |  افضل شركة نقل '} },
  { path: 'home', component: HomeComponent ,data: {title_en: 'Alqaqaa | Home', title_ar: 'القعقاع | شركات نقل الاثاث'} },
  { path: 'MyInformation/:id', component: GetInfComponent, canActivate: [AuthGurde] },
  { path: 'footer', component: FooterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGurde,GurdAdminService], data: {title_en: 'The fastest moving company | ourOffer', title_ar: '  شركة نقل وتغليف الاثاث | عروضنا '} },
  { path: 'home/offers', component: OffersComponent,canActivate: [AuthGurde,GurdAdminService],  data: {title_en: 'ourOffer', title_ar: 'عروضنا | ونش رفع الاثاث'}},
  { path: 'business', component: BusinessComponent, data: {title_en: ' The best furniture moving companies | Our business', title_ar: 'اعمالنا |  عربيات نقل العفش'} },
  { path: 'our-services', component: OurServicesComponent, data: {title_en: 'Alqaqaa | Our services', title_ar: 'اقرب شركة نقل موبيليا | خدمتنا'} },
  { path: 'home/business', component: BusinessComponent,data: {title_en: 'Alqaqaa | Some business', title_ar: ' بعض اعمالنا | اسرع شركات نقل العفش بالونش' }},
  { path: 'home/our-services', component: OurServicesComponent,data: {title_en: 'Alqaqaa | Some business', title_ar: ' بعض اعمالنا | اسرع شركات نقل العفش بالونش' }},
  { path: 'about-us', component: AboutUSComponent,data:{title_en: 'Alqaqaa | Contact Us', title_ar: 'القعقاع  | تواصل معنا'} },
  { path: 'supporters', component: SupportersComponent ,data: {title_en: 'Alqaqaa | Some Sponsors', title_ar: 'رعنا الرسمين | القعقاع'}},
  { path: 'register', component: RegsterComponent ,data: {title_en: 'Alqaqaa | Register', title_ar: 'التسجيل معنا | القعقاع '}},
  { path: 'login', component: LoginComponent ,data: {title_en: 'Alqaqaa | Login', title_ar: 'تسجيل الدخول'}},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | My profile', title_ar: 'صفحتي الشخصيه | اسرع شركات نقل الاثاث بالقاهرة'} },
  { path: 'activate/:token', component: ActivateComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Activate Email', title_ar: 'تفعيل الاميل  | القعقاع'} },
  { path: 'activate', component: ActivateComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Activate Email', title_ar: 'تفعيل الاميل  | القعقاع'} },
  { path: 'reset-password/:resetLink', component: ResetPasswordComponent,data: {title_en: 'Alqaqaa | Reset Password', title_ar: 'إعادة تعيين كلمة المرور | القعقاع'} },
  { path: 'forget-password', component: ForgetPasswordComponent,data: {title_en: 'Alqaqq | Forget Password', title_ar: 'نسيت كلمة المرور | القعقاع'} },
  { path: 'profile/change-password', component: ChangePasswordComponent,canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Changed Password', title_ar: 'تغيير كلمة المرور | القعقاع'} },
  { path: 'update-avatar/:id', component: UpdateAvatarComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Update Avatar', title_ar: 'تحديث صورتي | القعقاع'} },
  { path: 'update-info/:id', component: UpdateInfComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Update My Info', title_ar: 'تحديث معلوماتي | القعقاع'} },
  { path: 'update-social/:id', component: UpdateSocialComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Update Social Media', title_ar: 'تحديث وسائل التواصل الاجتماعية | القعقاع'} },
  { path: 'home/details-business/:id', component: DetailsBusinessComponent ,data: {title_en: 'Alqaqaa | Details Business', title_ar: 'تفاصيل العمل | نقل عفش | نقل اثاث'}},
  { path: 'home/details-services/:id', component: DetailsServicesComponent  ,data: {title_en: 'Alqaqaa | Details Service', title_ar: 'تفاصيل الخدمة | ونش عفش  | ونش اثاث'}},
  { path: 'home/details-offers/:id', component: DetailsOffersComponent  ,data: {title_en: 'Alqaqaa | Details Offer', title_ar: 'تفاصيل العرض | ونش رفع عفش | ونش رفع اثاث'}},
  { path: 'business/details-business/:id', component: DetailsBusinessComponent ,data: {title_en: 'Alqaqaa | Details Business', title_ar: 'تفاصيل العمل | ونش رفع الاثاث '}},
  { path: 'services/details-services/:id', component: DetailsServicesComponent,data: {title_en: 'Alqaqaa | Details Service', title_ar: 'تفاصيل الخدمة | ونش رفع العفش '} },
  { path: 'offers/details-offers/:id', component: DetailsOffersComponent ,data: {title_en: 'Alqaqaa | Details Offer', title_ar: 'تفاصيل العرض | القعقاع افضل شركات النقل'}},
  { path: 'profile/details-user-offers/:id', component: DetailsOffersUserComponent, canActivate: [AuthGurde] ,data: {title_en: 'Alqaqaa | Details Offer', title_ar: 'تفاصيل العرض | افضل شركات الصيانه '}},
  { path: 'profile/details-user-orders/:id', component: DetailsOrdersComponent, canActivate: [AuthGurde],data: {title_en: 'Alqaqaa | Details Order', title_ar: 'تفاصيل الطلب | القعقاع افضل شركة للبادة الحشرات'} },
  { path: 'dleat-info/:id', component: DleatInfComponent, canActivate: [AuthGurde] },
  { path: '**', component: NotFondComponent },
  { path: 'notFound', component: NotFondComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
