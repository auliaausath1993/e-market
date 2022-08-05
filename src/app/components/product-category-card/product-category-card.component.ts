import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-product-category-card',
  templateUrl: './product-category-card.component.html',
  styleUrls: ['./product-category-card.component.scss'],
})
export class ProductCategoryCardComponent implements OnInit {
  @Input() product: Product;
  constructor() { }
  
  ngOnInit() {}

}
