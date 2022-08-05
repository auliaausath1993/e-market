import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/app/api-url';
//import { AddAddressPage } from '../add-address/add-address.page';



@Component({
  selector: 'app-dropship',
  templateUrl: './dropship.page.html',
  styleUrls: ['./dropship.page.scss'],
})
export class DropshipPage implements OnInit {

  penerima: any
  telp: any
  alamat: any
  kodepos: any
  pengirim: any
  address_id : string;

  constructor(
    private router: Router, 
    public toastcontroller: ToastController, 
    public http: HttpClient, 
    private modalCtrl: ModalController,
    url: ActivatedRoute
  ) {
    url.queryParams.subscribe((m) => {
      this.address_id = m.address_id;
    });
  }

  dataAddress: any = [];
  dataOngkir: any = [];
  
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAddress();
    this.getOngkir();
    this.showCart();
  //  this.getMetodePembayaran();
  }

  /* async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddAddressPage
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log('data modal', data);
        this.penerima = "coba"
      })

    return await modal.present();
  } */

  getAddress(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'addresses', reqData)
    .subscribe((res) => {
      this.dataAddress = res;
      console.log(this.dataAddress);
      if(this.address_id)
      {
        this.addressSelected = this.dataAddress.find(obj => obj.id === this.address_id);
      }
    });
  }

  getOngkir(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'getOngkir', reqData)
    .subscribe((res) => {
      this.dataOngkir = res;
      console.log(this.dataOngkir);
    });
  }

  dataOrder: any;
  totalAmount:any;
  totalQty:any;
  showCart(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'list_order', reqData)
      .subscribe(data => {
        console.log(data);
        this.dataOrder = data['order'];
        this.totalAmount = data['total_amount'];
        this.totalQty = data['total_qty'];
        this.order.totalAmount = this.totalAmount;
        this.order.totalQty = this.totalQty;
      });
  }

  presentModal(){
    this.router.navigate(['/add-address']);
  }

  payment(){
    this.router.navigate(['/confirm-payment']);
  }

  order:any = {};
  areaSelected:any;
  check() {
    console.log(this.order.area_id)
    this.areaSelected = this.dataOngkir.find(e => e.id === this.order.area_id);
    console.log(this.areaSelected)
    this.order.total = (Number(this.areaSelected.fee) + this.totalAmount);
    console.log(this.order)
  }

  addressSelected:any;
  // selectAddress(item) {
  //   this.addressSelected = item;
  // }

  dropship_test() {
    if(this.address_id != undefined && this.areaSelected != undefined) {
      let items_id : any = [];
      this.dataOrder.forEach(m => items_id.push(m.order_item_id));
      var arrQty = [];
      var arrID  = [];
      let reqData = {
        "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
        "order_item_id" : items_id,
        "customer_id": localStorage.getItem("customer_id"),
        "address_id":this.address_id,
        "ongkir" : this.areaSelected.fee
      }
      this.http.post(APIURL.apiURL + 'dropship', reqData)
        .subscribe(data => {
          console.log(data);
          let sts = data['status'];
          if(sts == "Failed"){
            this.toastcontroller.create({
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
            //TODO : direct to dropship info
            this.router.navigate(['/order-detail'], { queryParams: {id: data['order_id']}});
            //this.api.pay();
            // this.toastcontroller.create({
            //   message: data['message'],
            //   position: 'bottom',
            //   duration: 5000,
            //   buttons: [
            //     {
            //       side: 'end',
            //       icon: 'checkmark-done-circle-outline'
            //     }
            //   ]
            // }).then((toast) => {
            //   toast.present();
            // });
            // setTimeout(() => {
            //   this.router.navigate(['/confirm-payment']);
            // }, 900);
          }
          
        });
    } else {
      let msg = '';
     // console.log(this.addressSelected)
      console.log(this.areaSelected)
      if(this.address_id == undefined && this.areaSelected != undefined) {
        msg = 'Sertakan alamat dengan benar agar memudahkan untuk pengiriman product!';
      } else if(this.address_id != undefined && this.areaSelected == undefined) {
        msg = 'Pilih area!'
      } else {
        msg = 'Masukkan alamat dan area pengiriman!'
      }
      this.toastcontroller.create({
        message: msg,
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
    }
  }
}
