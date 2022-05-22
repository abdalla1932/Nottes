import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggin = new BehaviorSubject(null)
  
  

  

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 

    if(localStorage.getItem('currentUser'))
    {
      this.saveCurrentUser()
    }
  }

  baseUrl:string = 'https://routeegypt.herokuapp.com/'

  signin(data:any): Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signin',data)
  }
  signup(data:any): Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signup',data)
  }


  saveCurrentUser()
  {
    let encodeToken:any = localStorage.getItem('currentUser')
    let decodeToken:any = jwtDecode(encodeToken)
    this.isLoggin.next(decodeToken)
  }



  logOut()
  {
    localStorage.removeItem('currentUser')
    this.isLoggin.next(null)
    this._Router.navigate(['/signin'])
  }
}
