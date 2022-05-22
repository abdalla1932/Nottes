import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  islogin:boolean = false
  userName:any = []

  constructor(private _AuthService:AuthService, private _Router:Router) { 
    this._AuthService.isLoggin.subscribe((res)=>{
    this.userName = res
   });

    this._AuthService.isLoggin.subscribe(()=>{
      
     if(_AuthService.isLoggin.getValue()==null)
     {
       this.islogin = false;
     }
     else
     {
       this.islogin = true;
     }
    })
  }
 logOut()
 {
   this._AuthService.logOut()
 }

  ngOnInit(): void {
  }

}
