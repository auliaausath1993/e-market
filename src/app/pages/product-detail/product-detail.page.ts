import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/app/api-url';
import { concat, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product_id: any;

  stock_groshir = [
    {
      "variant": "100gr",
      "qty_awal": 5,
      "qty_akhir": 10,
      "harga": 50000
    },
    {
      "variant": "300gr",
      "qty_awal": 11,
      "qty_akhir": 15,
      "harga": 70000
    },
    {
      "variant": "500gr",
      "qty_awal": 16,
      "qty_akhir": 20,
      "harga": 85000
    },
    {
      "variant": "700gr",
      "qty_awal": 21,
      "qty_akhir": 25,
      "harga": 90000
    }
  ]
  
  disable = false;
  isFavorite: boolean;
  
  imageConfig = {
    centeredSlides: true,
    slidesPerView: 1,
  };

  private currentNumber = 0;

  public data:Observable<any>;
  product:any;
  product_variant:any;
  listDetailProduct:any;
  status:string;
  nutrisi:string;
  customer_name: string;
  customer_email: string;
  qty: number = 1;

  variant_qty = [];
  id_variant = [];

  price: string[];
  jumData: number;
  jumVarian: number;

  variant_data: string;
  newArray: any;
  var_id: any;
  constructor(private route: ActivatedRoute, private router: Router, public http: HttpClient, public toastController: ToastController) {
    this.isLogging();
    
  }
  
  ngOnInit() {
    this.product_id = this.route.snapshot.params.id;
    let reqData = {
      "product_id": this.product_id
    }

    this.http.post(APIURL.apiURL + 'get_detail_product', reqData)
      .subscribe(data => {
        this.product = {
          item_name: data['name_item'],
          subtitle: data['harga'],
          image: data['img_medium'],
          price: data['harga'],
          quantity: 1,
        };
        console.log(data)
        this.product_variant = (data['variant'] == undefined ? []:data['variant']);
        this.nutrisi = data['keterangan'];
        this.jumData = this.product_variant.length;
      });
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

  increase(item) {
    if (item.quantity === 1) {
      this.disable = false;
    }
    item.quantity++;
  }

  private increment(price) {
    if (price.quantity === 1) {
      this.disable = false;
    }
    price.quantity++;
  }
  
  private decrement (price) {
    if (price.quantity < 1) {
      this.disable = true;
    } else {
      price.quantity--;
    }
  }

  
  decrease(item) {
    if (item.quantity < 2) {
      this.disable = true;
    } else {
      item.quantity--;
    }
  }
  
  favorite() {
    this.isFavorite = !this.isFavorite;
  }

  trackByFn(index: any, item: any) {
    return index;
  } 
  
  
  addToCart() {
    var arrQty = [];
    var arrID  = [];

    for(let i=0; i<this.jumVarian;i++){
      arrQty.push(this.variant_qty[i]);
      arrID.push(document.getElementById("var_id" + "_" + i).innerHTML);
    }
    this.product_id = this.route.snapshot.params.id;
    let reqData = {
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "prod_id": this.product_id,
      "variant_id": arrID,
      "qty": arrQty,
      "notes": "Catatan",
      "ref": "Android",
      "customer_id": localStorage.getItem("customer_id")
    }
    this.http.post(APIURL.apiURL + 'process_order_item', reqData)
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
          setTimeout(() => {
            this.router.navigate(['/tabs/cart']);
          }, 900);
        }
        
      });
  }
}
