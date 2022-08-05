import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-product-all-card',
  templateUrl: './product-all-card.component.html',
  styleUrls: ['./product-all-card.component.scss'],
})
export class ProductAllCardComponent implements OnInit {
  @Input() allproduct: Product;
  constructor() { }

  ngOnInit() {}

}
