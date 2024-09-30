import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const toastrInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastr.error('Unauthorized! Please log in again.', 'Error 401');
      } else if (error.status === 500) {
        toastr.error('Internal server error! Please try again later.', 'Error 500');
      } else if (error.status === 404) {
        toastr.error('Resource not found!', 'Error 404');
      } else {
        toastr.error('An unexpected error occurred. Please try again.', 'Error');
      }
      return throwError(() => error);
    })
  );
}
