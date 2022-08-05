import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectable-btn',
  templateUrl: './selectable-btn.component.html',
  styleUrls: ['./selectable-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableBtnComponent implements OnInit {

  @Input() item: any;
  @Output() state: EventEmitter<any>;

  constructor() {
    this.state = new EventEmitter();
  }

  ngOnInit() {
  }

  setActive() {
    this.state.emit({ name: this.item.name, active: !this.item.active });
  }
}
