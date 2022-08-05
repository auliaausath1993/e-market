import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, ToastController, LoadingController} from '@ionic/angular';
import { APIURL } from 'src/app/api-url';
import { ModalController } from '@ionic/angular';
import { ModalOtpPage } from '../modal-otp/modal-otp.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  signForm: FormGroup;
  fullName    :string;
  email       :string;
  phoneNumber :number;
  password    :string;
  loading     :any;
  
  constructor(
    private firebaseX: FirebaseX,
    private loadingctrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private platform: Platform,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private googlePlus: GooglePlus,
    private fireAuth: AngularFireAuth
    ) { }
    
    ngOnInit() {
      this.signForm = this.formBuilder.group({
        fullName: [null, [Validators.required]],
        email: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required]],
        password: [null, [Validators.required]],
      });
    }
    
    async presentModal() {
      const modal = await this.modalCtrl.create({
        component: ModalOtpPage
      });
      await modal.present();
    }
    
    signUp() {
      if (this.signForm.valid) {
        this.fullName    = this.signForm.value.fullName;
        this.email       = this.signForm.value.email;
        this.phoneNumber = this.signForm.value.phoneNumber;
        this.password    = this.signForm.value.password;
        
        let postData = {
          "nama": this.fullName,
          "email": this.email,
          "password": this.password,
          "phone": this.phoneNumber
        }
        
        
        this.presentLoadingWithOptions();
        setTimeout(() => {
          this.http.post(APIURL.apiURL + 'register_v2', postData)
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
              this.presentModal();
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
          
        }, 1500);
      } 
      else{
        
      }
    }
    
    signInWithGoogle(){
      let params: any;
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          params = {
            webClientId: '851911116686-knvrb8t86ecrd6juv1ootmj27lgruv0h.apps.googleusercontent.com', //  androidID 'string'
            offline: true
          };
        } else {
          params = {
            webClientId: '851911116686-tm6heij2ltrdubqtjo4645mi79nh3vid.apps.googleusercontent.com', //  webclientID 'string'
            offline: true
          };
        }
        this.googlePlus.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          console.log(JSON.stringify(response));
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          console.log(error);
          console.log('error:' + JSON.stringify(error));
        });
      } else{
        console.log('else...');
        this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(success => {
          console.log('success in google login', success);
          this.doRegister(success.user);
        }).catch(err => {
          console.log(err.message, 'error in google login');
        });
        // this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(success => {
        //   console.log('success in google login', success);
        //   this.doRegister(success.user);
        // }).catch(err => {
        //   console.log(err.message, 'error in google login');
        // });
      }
    }
    
    onLoginSuccess(accessToken, accessSecret) {
      const credential = accessSecret ? GoogleAuthProvider
      .credential(accessToken, accessSecret) : GoogleAuthProvider
      .credential(accessToken);
      this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        this.doRegister(success.user);
        this.loading.dismiss();
      }).catch(error => {
        console.log('l ' + JSON.stringify(error))
      });
    }
    
    doRegister(data){
      let val = data;
      this.loading = this.loadingctrl.create({
        message: 'Please Wait'
      }).then((res) => {
        res.present();
        
        res.onDidDismiss().then((dis) => {
          //console.log('Loading dismissed!');
        });
      });
      
      let postData = {
        "nama": val.name,
        "googleId": val.googleId,
        "idToken": val.idToken,
        "authToken": val.authToken,
        "email": val.email,
        "fcm_token": 123
      }
      
      this.http.post(APIURL.apiURL + 'register_gmail', postData)
      .subscribe(data => {
        console.log(data);
        let status = data['status'];
         
        if(status == "Success"){
          localStorage.setItem('customer_id', data['customer_id']);
          localStorage.setItem('customer_name', data['customer_name']);
          localStorage.setItem('customer_email', data['customer_email']);
          this.router.navigate(['/tabs/shop']);
          this.loadingctrl.dismiss();
        } else {
          if(data['error'].includes('Email is exists')) {

            
            //check ke be jika user sudah terdaftar dan valid maka masuk ke beranda
            this.loadingctrl.dismiss();


          } else {
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
            this.loadingctrl.dismiss();
          }
        }
      });
    }
    
    signIn(){
      this.router.navigate(['/signin']);
    }
    async presentLoadingWithOptions() {
      const loading = await this.loadingctrl.create({
        spinner: 'lines',
        duration: 1500,
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    }
  }
  
