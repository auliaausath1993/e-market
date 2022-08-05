import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOtpPageRoutingModule } from './modal-otp-routing.module';

import { ModalOtpPage } from './modal-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOtpPageRoutingModule
  ],
  declarations: [ModalOtpPage]
})
export class ModalOtpPageModule {}
