import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare var $:any
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userData:any = []

  constructor(private _AuthService:AuthService, private _Router:Router) { 
    

  }
  


  signinForm:any = new FormGroup({
    
    email: new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])


  })

  checked:boolean = true;
  checkRespons:boolean=false;
  answer:string=""

  formData(signinForm:any){
    if(this.signinForm.valid)
    {
      this._AuthService.signin(signinForm.value).subscribe((respons)=>{
        this.checked = false
        this.checkRespons=true;
        
        this.answer=respons.message
        if(respons.message=='success')
        {
          this.checked = true
         localStorage.setItem('currentUser',respons.token)
         this._AuthService.saveCurrentUser();
         this._Router.navigate(['/profile'])
        }
        else{
          this.checked = true;
          this.signinForm.reset()
        }
      })
    }
  }

  ngOnInit(): void {
    $("#particle").particleground()

  }

}

