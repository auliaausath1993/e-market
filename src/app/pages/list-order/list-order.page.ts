import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIURL } from '../v1/api-url';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.page.html',
  styleUrls: ['./list-order.page.scss'],
})
export class ListOrderPage implements OnInit {

  constructor(private router: Router,
    public http: HttpClient) { }

    dataOrder: any
  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.getData();
  }

  getData(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'get_list_order', reqData)
    .subscribe((res) => {
      if(res["status"]){
        this.dataOrder = res["list"];
      }
      
    });
  }

  detail(order_id:string)
  {
    this.router.navigate(['/order-detail'], { queryParams: {id: order_id}});
  }
}
