import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;

  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  /* Validation method starts */
  validate(){
    if(this.name){
      if(this.email){
        if(this.password){
          if(this.password1){
            if(this.password === this.password1){
              return true;
            }else{
              this.data.error('Password do not match.')
            }
          }else{
            this.data.error('Confirmation Password is not entered')
          }
        }else{
          this.data.error('Password is not entered');
        }
      }else{
        this.data.error('Email is not entered');
      }
    }else{
      this.data.error('Name is not entered')
    }
  }

  /* Registration method strat here */
  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller,
          },
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successful!');
          await this.data.getProfile();
         // this.router.navigate(['/']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
