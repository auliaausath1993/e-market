import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { APIURL } from 'src/app/api-url';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
 
  loginForm: FormGroup;
  email: string;
  password: string;
  token: string;
  status: string;
  is_otp: boolean;

  
  constructor(public http: HttpClient, private formBuilder: FormBuilder, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      let postData = {
        "customer_id": this.loginForm.value.email,
        "password": this.loginForm.value.password,
        "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
      }

      this.http.post(APIURL.apiURL + 'login', postData)
        .subscribe(data => {
          this.status = data['status'];
          this.is_otp = data['kirim_otp']
          console.log(this.is_otp);
          
          if(this.is_otp === true){
            this.toastController.create({
              message: "Status akun anda sedang ditangguhkan. Silakan hubungi Admin untuk aktivasi melalui menu Chat pada icon di pojok kanan atau melalui WhatsApp di menu informasi",
              position: 'bottom',
              duration: 5000,
              buttons: [
                {
                  side: 'end',
                  icon: 'warning'
                }
              ]
            }).then((toast) => {
              toast.present();
            });
          }
          else if(this.status == "Success"){
            console.log(data);
            this.loginForm.reset();
            localStorage.setItem('customer_id', data['customer_id']);
            localStorage.setItem('customer_name', data['customer_name']);
            localStorage.setItem('customer_email', data['customer_email']);
            this.router.navigate(['/tabs/shop']);
          }
          else if(this.status == "Failed"){
            this.toastController.create({
              message: data['error'],
              position: 'bottom',
              duration: 5000,
              buttons: [
                {
                  side: 'end',
                  icon: 'warning'
                }
              ]
            }).then((toast) => {
              toast.present();
            });
          }
          else{
            this.toastController.create({
              message: data['error'],
              position: 'bottom',
              duration: 5000,
              buttons: [
                {
                  side: 'end',
                  icon: 'warning'
                }
              ]
            }).then((toast) => {
              toast.present();
            });
          }
        });
    } else {
      console.log('invalid');
    }
  }

}
