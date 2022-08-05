import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFailedPageRoutingModule } from './modal-failed-routing.module';

import { ModalFailedPage } from './modal-failed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFailedPageRoutingModule
  ],
  declarations: [ModalFailedPage]
})
export class ModalFailedPageModule {}
