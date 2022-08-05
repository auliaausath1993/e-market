import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { APIURL } from 'src/app/api-url';
import { ModalAcceptedPage } from '../modal-accepted/modal-accepted.page';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage {
  loading;
  qty1 = [];
  qty1Dibeli = [];
  qty2 = [];
  qty2Dibeli = [];
  lazy_loading : boolean = true



  cart = {
    products: [
      {
        title: 'Red Apple',
        subtitle: '1Kg',
        image: 'assets/images/apple.png',
        price: 4.99,
        quantity: 1
      },
      {
        title: 'Ranch Eggs',
        subtitle: '12pcs',
        image: 'assets/images/eggs.png',
        price: 0.29,
        quantity: 1
      },
      {
        title: 'Chicken',
        subtitle: '1Kg',
        image: 'assets/images/chicken.png',
        price: 1.99,
        quantity: 1
      },
      {
        title: 'Waiyu Beef',
        subtitle: '1Kg',
        image: 'assets/images/meat.png',
        price: 24.99,
        quantity: 1
      }
    ],
    subtotal: 244,
    taxRate: 12
  };
  customer_name: string;
  customer_email: string;
  product_id: string;
  customer_id: string;
  product:any;
  dataOrder: any;
  totalAmount: any;
  disable = false;


  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public http: HttpClient,
    public toastController: ToastController,
    private loadingController: LoadingController,
    // private events: Event
    ) {
    this.isLogging();
    this.showCart();
  }

  ionViewWillEnter() {
    this.showCart();
  }

  async openModalAccepted() {
    const modal = await this.modalCtrl.create({
      component: ModalAcceptedPage,
      id: 'ModalAccepted',
    });
    return await modal.present();
  }

  isLogging(){
    this.customer_name = localStorage.getItem('customer_name');
    this.customer_email = localStorage.getItem('customer_email');
    console.log("Email: "+ this.customer_email);
    if(this.customer_name==null && this.customer_email==null){
      this.router.navigate(['/signup']);
    }
    else{
      return false;
    }
  }

  dropship(){
    this.router.navigate(['/dropship']);
  }

  async showCart(){
    this.lazy_loading = true
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'list_order', reqData)
      .subscribe(data => {
        this.dataOrder = data['order'];
        console.log(this.dataOrder);
        this.lazy_loading = true;
        this.totalAmount = data['total_amount'];
      });
  }

  tambah(what, index, data) {
    if (what === 'qty1') {
      this.addToCart(data, 1, what, index);
    } else if (what === 'qty2') {
      this.addToCart(data, 1, what, index);
    }
    this.calculate();
  }

  addToCart(data, qty, what, index){
    let reqData = {
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "prod_id": data.product_id,
      "variant_id": '0',
      "qty": 1,
      "notes": "Catatan",
      "ref": "Android",
      "price": data.harga,
      "customer_id": localStorage.getItem("customer_id")
    }
    this.loading = this.loadingController.create({duration: 3000, message: 'Silahkan Tunggu'}).then((res) => {res.present(); res.onDidDismiss().then((dis) => {}); });

    this.http.post(APIURL.apiURL + /* buat API update cart disini */'', reqData)
    .subscribe(data => {
      console.log(reqData);
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
        if (what === 'qty1') {
          this.qty1[index] += 1;
          this.qty1Dibeli[index] = true;
        } else if (what === 'qty2') {
          this.qty2[index] += 1;
          this.qty2Dibeli[index] = true;
        }

        //this.events.publish('update_cart', '1', Date.now());
        setTimeout(() => {

        }, 900);
      }

    });

  }

  increase(item) {
    if (item.qty === 1) {
      this.disable = false;
    }
    item.qty++;
    this.calculate();
  }

  decrease(item) {
    if (item.qty < 2) {
      this.disable = true;
    } else {
      item.qty--;
    }
    this.calculate();
  }


  calculate(){
    this.totalAmount = 0;
    this.dataOrder.forEach((x) => {
      this.totalAmount += (x.price * x.qty);
      this.updateItem(x);
    });
  }

  updateItem(item : any){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "orders_item_id" : item.order_item_id,
      "qty" : item.qty * 1,
      "price" : item.price * 1
    }
    this.http.post(APIURL.apiURL + 'update_orders_item', reqData)
      .subscribe(data => {
      });
  }

  delete(order_item_id)
  {
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "order_item_id" : order_item_id,
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'delete_order_list', reqData)
      .subscribe(data => {
        this.showCart();
      });
  }
}
