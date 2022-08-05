import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAcceptedPageRoutingModule } from './modal-accepted-routing.module';

import { ModalAcceptedPage } from './modal-accepted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAcceptedPageRoutingModule
  ],
  declarations: [ModalAcceptedPage]
})
export class ModalAcceptedPageModule {}
