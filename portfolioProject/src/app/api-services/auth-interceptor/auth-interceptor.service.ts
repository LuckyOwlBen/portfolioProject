import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStore } from '../../ngrx/app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  readonly store = inject(AppStore);
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorization = this.store.authentication().jwt.toString();
    return authorization
      ? next.handle(req.clone({headers: req.headers.set('Authorization', authorization)}))
      : next.handle(req)
  }
}
