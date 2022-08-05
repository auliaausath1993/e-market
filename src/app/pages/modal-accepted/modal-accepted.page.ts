import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-accepted',
  templateUrl: './modal-accepted.page.html',
  styleUrls: ['./modal-accepted.page.scss'],
})
export class ModalAcceptedPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }

  backHome() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/shop']);
  }
}
