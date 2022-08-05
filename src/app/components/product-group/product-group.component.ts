import { Component, Input, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss'],
})
export class ProductGroupComponent implements OnInit {

  @Input() group: ProductGroup;

  constructor() { }

  ngOnInit() {}

}
