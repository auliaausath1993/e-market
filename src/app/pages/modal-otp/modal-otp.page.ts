import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { APIURL } from 'src/app/api-url';

@Component({
  selector: 'app-modal-otp',
  templateUrl: './modal-otp.page.html',
  styleUrls: ['./modal-otp.page.scss'],
})
export class ModalOtpPage implements OnInit {
  otp_a: number;
  otp_b: number;
  otp_c: number;
  otp_d: number;
  otp_e: number;
  otp_f: number;
  token: string;
  otp_code: number;
  customer_id: string;

  constructor(public http: HttpClient, private modalCtrl: ModalController, private router: Router, public toastController: ToastController, public loadingCtrl: LoadingController) { }
 
  ngOnInit() {}

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

  verifOTP(){
    this.otp_code = this.otp_a + this.otp_b  + this.otp_c + this.otp_d + this.otp_e + this.otp_f;
    let postData = {
      "otp_code"   : this.otp_code,
      "token"      : this.token,
      "customer_id": this.customer_id
    }

    setTimeout(() => {
      this.http.post(APIURL.apiURL + 'checkOtp', postData)
        .subscribe(data => {
          console.log(data);
          let status = data['status'];
          if(status == "Success"){
            this.toastController.create({
              message: data['message'],
              position: 'bottom',
              duration: 5000,
              buttons: [
                {
                  side: 'end',
                  icon: 'information-circle'
                }
              ]
            }).then((toast) => {
              toast.present();
            });
            this.modalDismiss();
            this.router.navigate(['/signin']);
          }
          else{
            this.toastController.create({
              message: data['message'],
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
      
    }, 800);

  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      duration: 1500,
      message: 'Verifikasi OTP...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  resendOTP(){
    this.toastController.create({
      message: "Kode OTP telah dikirim ulang",
      position: 'bottom',
      duration: 5000,
      buttons: [
        {
          side: 'end',
          icon: 'information-circle'
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }
}
