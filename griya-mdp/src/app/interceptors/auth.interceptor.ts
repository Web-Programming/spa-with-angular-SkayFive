import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // 1. Clone request dan tambahkan header jika token ada
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Lanjutkan request dan handle error 401 (Unauthorized)
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expired atau invalid
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};