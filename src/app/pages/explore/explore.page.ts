import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APIURL } from 'src/app/api-url';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage {

  categories = [
    {
      image: 'assets/images/bakery-category.png',
      category: 'Bakery & Snacks',
      color: 'red'
    },
    {
      image: 'assets/images/meats-category.png',
      category: 'Fresh Meats & Fish',
      color: 'orange'
    },
    {
      image: 'assets/images/fruit-category.png',
      category: 'Fruits & Vegetables',
      color: 'green'
    },
    {
      image: 'assets/images/oil-category.png',
      category: 'Cooking Oils & Sauces',
      color: 'magenta'
    }
  ];

  public Explore: Observable<any>;
  public dataExplore:any;
  listExplore:string;
  status:string;
  customer_name: string;
  customer_email: string;
  constructor(private router: Router, public http: HttpClient) {
    this.loadKategory();
    this.isLogging();
  }

  loadKategory(){
    this.Explore = this.http.get(APIURL.apiURL + 'get_list_product_category');
    this.Explore.subscribe(result => {
      this.dataExplore = result;
      this.status = this.dataExplore.status;
      if(this.status == "Success"){
        this.listExplore = this.dataExplore.category;
        console.log(this.listExplore);
      }
      else{
        console.error('No data found');
      }
    });
  }

  gotoCategory(id, name) {
    this.router.navigate(['/listing', { id:id, name:name }]);
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
}
