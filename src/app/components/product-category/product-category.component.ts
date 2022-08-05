import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {

  @Input() category: ProductCategory;

  constructor() { }

  ngOnInit() {}

}
