import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../login/LoginInfo';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private httpClient :HttpClient) { }
  // user(){
  //   return [
  //     {id:1,name:'html'},
  //     {id:2,name:'css'},
  //     {id:3,name:'js'},
  //     {id:4,name:'bootstrap'},
  //     {id:5,name:'angular'},
  //   ]
  // }
  getUserdata():Observable<LoginInfo[]>{
    return this.httpClient.get<LoginInfo[]>('http://localhost:3000/user')
  };

 createUserdata(createResouce:string):Observable<LoginInfo[]>{
  return this.httpClient.post<LoginInfo[]>('http://localhost:3000/user',createResouce)
 };

 updateUserdata(username:string,updateBody:string){
  const endPointUrl='http://localhost:3000/user/' + username;
  return this.httpClient.put(endPointUrl,updateBody);
 };

 deleteUserdata(userId:string){
  const deleteEndPoint= 'http://localhost:3000/user/' + userId;
  return this.httpClient.delete(deleteEndPoint);
}

}
