import { Component } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { HttpClient, } from '@angular/common/http';
import { APIURL } from 'src/app/api-url';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';


/**
* Import Page Product Detail
*/
import { ProductDetailPage } from '../product-detail/product-detail.page';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss']
})
export class ShopPage {

  // public cart: any;
  loading;

  slideConfig = {
    spaceBetween: 1,
    slidesPerView: 2,
  };

  groupConfig = {
    spaceBetween: 1,
    slidesPerView: 1.3,
  };

  groups = [
    {
      image: 'assets/images/product-group-1.png',
      group: 'Rices',
      color: 'red'
    },
    {
      image: 'assets/images/product-group-2.png',
      group: 'Beans',
      color: 'green'
    }
  ];

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

  product_id: any;
  variant_id: 0;

  public data:Observable<any>;
  public dataProduct:any;
  public dataTotalCart:any;

  listProduct:string;
  listCartTotal:string;
  status:string;
  customer_name: string;
  customer_email: string;

  public bestSelling: Observable<any>;
  public dataBestSelling:any;
  listBestSelling:string;

  public Grocery: Observable<any>;
  public dataGrocery:any;
  listGrocery:string;
  response: any;
  lazy_loading : boolean = true

  toast;

  slideOptions = {
    initialSlide: 1,
    speed: 300,
  };

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private router: Router,
    public http: HttpClient,
    public toastController: ToastController,
    private loadingController: LoadingController) {
    this.loadTodayOffers();
    this.loadBestSelling();
    this.loadGrocery();
    this.isLogging();
    this.getCart();

  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  ngOnInit() {
    this.getCart();
  }

  ionViewWillEnter() {
    this.getCart();
  }


  /* addToCart1(data) {
    const body = new FormData();

    body.append('product_id', data.product_id);
    body.append('variant_id', '0');
    body.append('qty', '1');
    body.append('notes', 'Catatan');
    body.append('price', '12000');
    body.append('customer_id', localStorage.getItem("customer_id"));
    body.append('token', '8abf4902a0db27dcb7f62a01c2fd0d0a');

    this.http.post(APIURL.apiURL + 'process_order_item1', body).subscribe(res => {
      this.cart = res;

    });
  } */

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

  productDetail(id, name) {
    this.router.navigate(['/detail', { id: id, name:name }]);
  }

  seeAllProduct(title) {
    this.router.navigate(['/all-product', { title:title }]);
  }

  isLogging(){
    this.customer_name = localStorage.getItem('customer_name');
    this.customer_email = localStorage.getItem('customer_email');
    if(this.customer_name==null && this.customer_email==null){
      this.router.navigate(['/signup']);
    }
    else{
      return false;
    }
  }

  async getCart() {
    this.lazy_loading = true
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.data = this.http.post(APIURL.apiURL + 'get_cart_total', reqData)
    this.data.subscribe(result => {
      this.dataTotalCart = result;
      this.status = this.dataTotalCart.status;
      if(this.status == "Success"){
        this.lazy_loading = true
        this.listCartTotal = this.dataTotalCart.total_cart;
        console.log(this.listCartTotal);
      }
      else{
        console.error('No data found');
      }
    });
  }

  loadTodayOffers() {
    this.lazy_loading = true
    this.data = this.http.get(APIURL.apiURL + 'get_list_product_v2');
    this.data.subscribe(result => {
      this.dataProduct = result;
      this.status = this.dataProduct.status;
      if(this.status == "Success"){
        this.lazy_loading = true
        this.listProduct = this.dataProduct.product;
        console.log(this.listProduct);
      }
      else{
        console.error('No data found');
      }
    });
  }


  loadBestSelling() {
    let reqData = {
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "customer_id": localStorage.getItem("customer_id")
    }

    this.data = this.http.post(APIURL.apiURL + 'get_dashboard_data', reqData);
    this.data.subscribe(result => {
      console.log(result);
      this.dataBestSelling = result;
      let cekAda = this.dataBestSelling.data_best_seller;
      if(cekAda == undefined){
        console.log("No data found");
      }
      else{
        this.listBestSelling = this.dataBestSelling.data_best_seller;
        console.log(this.listBestSelling);
      }

    });
  }

  loadGrocery() {
    this.Grocery = this.http.get(APIURL.apiURL + 'get_list_product_category');
    this.Grocery.subscribe(result => {
      this.dataGrocery = result;
      this.status = this.dataGrocery.status;
      if(this.status == "Success"){
        this.listGrocery = this.dataGrocery.category;
        console.log(this.listGrocery);
      }
      else{
        console.error('No data found');
      }
    });
  }

  cart(){
    this.router.navigate(['tabs/cart']);
  }

}
