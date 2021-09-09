
  import { Injectable } from '@angular/core';
  import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { UsersServiceService } from '../users-service.service';
  
  @Injectable({providedIn: 'root'})
  export class authInterceptor implements HttpInterceptor {
      constructor(private auth : UsersServiceService) {}
  
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          const token = this.auth.getToken()
          if(token){
              const cloned = req.clone({
                  headers : req.headers.set('x-auth-token',`${token}`)
              })
              return next.handle(cloned)
          }
            return next.handle(req)
    }
  }
  

