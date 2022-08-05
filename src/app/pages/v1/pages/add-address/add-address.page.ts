import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { APIURL } from 'src/app/api-url';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})

export class AddAddressPage implements OnInit {
  
  addressForm: FormGroup;
  recipient_name = '';
  recipient_phone : number = null;
  address: '';
  postal_code = '';
  sender = '';
  isLoadingResults = false;
  dataAddress: any = [];
  
  constructor(private formBuilder: FormBuilder, public http: HttpClient, private modalCtrl: ModalController, private router: Router, public toastController: ToastController, public loadingCtrl: LoadingController) {
    this.getCity();
  }
    
  dataCity: any;
  product_id: any;
  
  //public value = this.navParams.get('recipient_name');
  
  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      'token'           : "8abf4902a0db27dcb7f62a01c2fd0d0a",
      'customer_id'     : localStorage.getItem("customer_id"),
      'recipient_name' : [null, Validators.required],
      'recipient_phone' : [null, Validators.required],
      'address' : [null, Validators.required],
      'postal_code' : [null, Validators.required],
      'sender' : [null, Validators.required],
    });
  }
  ionViewWillEnter() {
    this.getAddress();
  }
  
  modalDismiss() {
    this.modalCtrl.dismiss();
  }
  
  add_process() {
    this.isLoadingResults = true;
    /* let reqData = {
      "token"           : "8abf4902a0db27dcb7f62a01c2fd0d0a",
      'customer_id'     : localStorage.getItem("customer_id"),
      'recipient_name'  : "aat",
      'recipient_phone' : "082299160032",
      'address'         : "Bekasi",
      'province_id'     : "4",
      'city_id'         : "6",
      'subdistrict_id'  : "9",
      'postal_code'     : "17422",
      'sender'          : "coba"
    } */
    this.http.post(APIURL.apiURL + 'add_address', this.addressForm.value)
    .subscribe(data => {
      //console.log(reqData);
      let sts = data['status'];
      if(sts == "Failed"){
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
      else{
        this.toastController.create({
          message: data['message'],
          position: 'bottom',
          duration: 5000,
          buttons: [
            {
              side: 'end',
              icon: 'checkmark-done-circle-outline'
            }
          ]
        }).then((toast) => {
          toast.present();
        });
        setTimeout(() => {
          this.router.navigate(['/dropship']);
        }, 900);
      }
      
    });
  }
  
  getCity(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'provinces', reqData)
    .subscribe(data => {
      this.dataCity = data['provinces'];
      console.log(this.dataCity);
    });
  }
  

  
  getAddress(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'addresses', reqData)
    .subscribe((res) => {
      this.dataAddress = res;
      console.log(this.dataAddress);
    });
  }

  
  selectAddress(item) {
    this.router.navigate(['/dropship'], { queryParams: {address_id: item.id}});
  }

}
