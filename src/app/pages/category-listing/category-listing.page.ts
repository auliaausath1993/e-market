import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FiltersPage } from '../filters/filters.page';
import { ActivatedRoute, Router } from '@angular/router';
import { APIURL } from 'src/app/api-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.page.html',
  styleUrls: ['./category-listing.page.scss'],
})
export class CategoryListingPage implements OnInit {

  products = [
    {
      title: 'Red Apple',
      subtitle: '1Kg',
      image: 'assets/images/apple.png',
      price: 4.99,
      inCart: false
    },
    {
      title: 'Ranch Eggs',
      subtitle: '12pcs',
      image: 'assets/images/eggs.png',
      price: 0.29,
      inCart: false
    },
    {
      title: 'Chicken',
      subtitle: '1Kg',
      image: 'assets/images/chicken.png',
      price: 1.99,
      inCart: false
    },
    {
      title: 'Waiyu Beef',
      subtitle: '1Kg',
      image: 'assets/images/meat.png',
      price: 24.99,
      inCart: false
    }
  ];
  category_id: any;
  product:any;
  product_variant:any;
  listDetailProduct:any;
  category_name:string;
  status:string;
  nutrisi:string;
  customer_name: string;
  customer_email: string;
  public data:Observable<any>;
  public dataProduct:any;
  public dataTotalCart:any;

  listProduct:string;
  listCartTotal:string;

  constructor(private modalCtrl: ModalController, private route: ActivatedRoute, private router: Router, public http: HttpClient, public toastController: ToastController) {
    this.isLogging();
    this.getCart();

  }

  cart(){
    this.router.navigate(['tabs/cart']);
  }

  ngOnInit() {
    this.category_id   = this.route.snapshot.params.id;
    this.category_name = this.route.snapshot.params.name;

    let reqData = {
      "category": this.category_id,
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
    }
    this.http.post(APIURL.apiURL + 'get_list_product_by_category', reqData)
      .subscribe(data => {
        this.status = data['status'];
        if(this.status == "Success") {
          this.product = data['product'];
          console.log(this.product);

        }
        else {
          console.log("Tidak ada produk untuk categori: " + this.category_id);
          this.displayToast();
        }


      });
  }
  productDetail(id, name) {
    this.router.navigate(['/detail', { id: id, name:name }]);
  }

  addToCart(data){
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
    // this.loading = this.loadingController.create({duration: 3000, message: 'Silahkan Tunggu'}).then((res) => {res.present(); res.onDidDismiss().then((dis) => {}); });

    this.http.post(APIURL.apiURL + 'process_order_item1', reqData)
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
          this.getCart();
        });
        setTimeout(() => {

        }, 900);
      }

    });

  }

  getCart() {
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.data = this.http.post(APIURL.apiURL + 'get_cart_total', reqData)
    this.data.subscribe(result => {
      this.dataTotalCart = result;
      this.status = this.dataTotalCart.status;
      if(this.status == "Success"){
        this.listCartTotal = this.dataTotalCart.total_cart;
        console.log(this.listCartTotal);
      }
      else{
        console.error('No data found');
      }
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

  displayToast() {
    this.toastController.create({
      message: 'Belum ada produk pada kategori ini',
      position: 'bottom',
      duration: 2000,
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

  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: FiltersPage,
      id: 'ModalFilter',
    });
    return await modal.present();
  }

}
