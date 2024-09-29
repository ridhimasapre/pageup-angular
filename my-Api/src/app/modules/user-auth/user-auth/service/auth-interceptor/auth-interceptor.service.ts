import { HttpEvent, HttpHandler, HttpInterceptor,HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../../SharedModules/shared/Loader/Service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { catchError,finalize,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  public token = '';
constructor(private loader:LoaderService,
  private toastr:ToastrService
){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loader.show();

    // this.token = localStorage.getItem('token') || '';
    // const modifiedReq = req.clone({ headers: req.headers.append('Authorization', `Bearer ${this.token}`) });
    this.token = localStorage.getItem('token') || '';

    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${this.token}`) 
    });
    // const modifiedReq = req.clone();
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.toastr.error(error.message, 'Error'); 
        return throwError(error);  
      }),
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}