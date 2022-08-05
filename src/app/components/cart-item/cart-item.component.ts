import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;

  disable = false;

  constructor() {}

  ngOnInit() {}

  increase(item) {
    if (item.qty === 1) {
      this.disable = false;
    }
    item.qty++;
  }

  decrease(item) {
    if (item.qty < 2) {
      this.disable = true;
    } else {
      item.qty--;
    }
  }
}
