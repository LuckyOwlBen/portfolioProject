import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Authentication, authenticationSelector } from '../../ngrx';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const store = inject(Store);
  let authorization: string | null = null;
  store.select(authenticationSelector).pipe(
    map((auth: Authentication) => auth.jwt.toString() || null)
  ).subscribe((authValue: string | null) => {
    authorization = authValue;
  });
  return authorization == null
    ? next(req)
    : next(req.clone({headers: req.headers.set('Authorization', 'Bearer ' + authorization)}));
}
