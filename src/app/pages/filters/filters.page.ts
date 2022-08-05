import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  categories = [
    { name: 'Bakery', active: true },
    { name: 'Fresh Snacks', active: false },
    { name: 'Fresh Meats', active: false },
    { name: 'Fresh Fruits', active: false },
    { name: 'Cooking Oils', active: false },
  ];

  brands = [
    { name: 'Grand Western', active: false },
    { name: 'Bimbo', active: true },
    { name: 'Heinz', active: true },
    { name: 'Helmans', active: false },
    { name: 'Coca Cola', active: false },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

  getState(evt) {
    const catAux = this.categories.findIndex((item: any) => item.name == evt.name);
    const brandAux = this.brands.findIndex((item: any) => item.name == evt.name);

    if(catAux > -1) this.categories[catAux] = evt;
    if(brandAux > -1) this.brands[brandAux] = evt;

  }
}
