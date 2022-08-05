import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-failed',
  templateUrl: './modal-failed.page.html',
  styleUrls: ['./modal-failed.page.scss'],
})
export class ModalFailedPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
