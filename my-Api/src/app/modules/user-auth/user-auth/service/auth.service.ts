import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LoginRequest,LoginResponse,LoginUser} from '../Model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url=`${environment.apiUrl}/api/Login`
  constructor(private httpclinet:HttpClient) { }
  public Login(data: LoginRequest ): Observable<LoginResponse<LoginUser>>{
    return this.httpclinet.post<LoginResponse<LoginUser>>(this.url, data);
  }
}
