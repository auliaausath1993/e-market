import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {}

}
