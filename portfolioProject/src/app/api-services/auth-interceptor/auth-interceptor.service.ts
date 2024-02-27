import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStore } from '../../ngrx/app.store';

  export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const store = inject(AppStore);
    const authorization = store.authentication().jwt.toString();
    console.log(authorization);
    return authorization
      ? next(req.clone({headers: req.headers.set('Authorization', authorization)}))
      : next(req)
  }

