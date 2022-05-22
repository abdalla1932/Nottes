import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $: any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  signupForm: any = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    age: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])



  })

  checked: boolean = true;
  checkRespons: boolean = false;
  answer: string = "";

  formData(signupForm: any) {

    this.checked = false;

    if (this.signupForm.valid) {
      this._AuthService.signup(signupForm.value).subscribe((respons) => {
        this.checkRespons = true;
        this.answer = respons.message;
        if (respons.message === 'success') {
          this.checked = true;
          this._Router.navigate(['/signin'])
        }
        else {
          this.checked = true
          this.signupForm.reset()
        }


      })
    }


  }

  ngOnInit(): void {
    $("#particle").particleground()
  }

}
