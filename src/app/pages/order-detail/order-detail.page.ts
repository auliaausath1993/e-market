import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/app/api-url';



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html'
})
export class OrderDetialPage implements OnInit {
  constructor(private router: Router,
    public http: HttpClient, url: ActivatedRoute
    ) {
      url.queryParams.subscribe((m) => {
        this.id = m.id;
      }); }

    id :string;
    dataOrder: any
    dataContent: any
  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.getData();
    this.getContent();
  }

  getData(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "order_id" : this.id
    }
    this.http.post(APIURL.apiURL + 'get_data_order_detail', reqData)
    .subscribe((res) => {
      this.dataOrder = res;
    });
  }

  getContent(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "order_id" : this.id
    }
    this.http.post(APIURL.apiURL + 'status_xendit', reqData)
    .subscribe((res) => {
      this.dataContent = res;
    });
  }

  createPayment(order_number : any){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a",
      "order_number" : order_number
    }
    this.http.post(APIURL.apiPayment + 'CreateInvoice', reqData)
      .subscribe(data => {
        console.log(data);
        window.location.href = data['InvoiceURL'];
      });
  }

  confirmPayment(id) {
    console.log("order id " + id);
    this.router.navigate(['/confirm-payment', {id: id}]);
  }
}
