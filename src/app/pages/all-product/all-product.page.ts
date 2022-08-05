import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { APIURL } from 'src/app/api-url';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.page.html',
  styleUrls: ['./all-product.page.scss'],
})
export class AllProductPage implements OnInit {
  title: string;
  public data:Observable<any>;
  public dataProduct:any;
  allProduct:string;
  status:string;
  constructor(private route: ActivatedRoute, private router: Router, public toastController: ToastController, public http: HttpClient) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.title;
    this.showProduct();
  }

  showProduct() {
    this.data = this.http.get(APIURL.apiURL + 'get_list_product_v2');
    this.data.subscribe(result => {
        this.dataProduct = result;
        this.status = this.dataProduct.status;
        if(this.status == "Success"){
          this.allProduct = this.dataProduct.product;
        }
        else{
          this.toastController.create({
            message: 'Tidak ada produk untuk ditampilkan',
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
    });
  }

  productDetail(id, name) {
    this.router.navigate(['/detail', { id: id, name:name }]);
  }

}
