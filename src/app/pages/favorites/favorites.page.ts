import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFailedPage } from '../modal-failed/modal-failed.page';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites = [
    {
      title: 'Sprite Light',
      subtitle: '335ml',
      image: 'assets/images/sprite.png',
      price: 1.99
    },
    {
      title: 'Ranch Peppers',
      subtitle: '100g',
      image: 'assets/images/pepper.png',
      price: 0.29,
    },
    {
      title: 'Premium Mayonnaise',
      subtitle: '400g',
      image: 'assets/images/mayo.png',
      price: 3.99
    },
    {
      title: 'Light Coke',
      subtitle: '330ml',
      image: 'assets/images/coke.png',
      price: 2.99
    }
  ];

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async openModalFailed() {
    const modal = await this.modalCtrl.create({
      component: ModalFailedPage,
      id: 'ModalFailed',
    });
    return await modal.present();
  }

  productDetail() {
    this.router.navigate(['/detail']);
  }

}
