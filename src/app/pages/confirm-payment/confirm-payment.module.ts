import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPaymentPageRoutingModule } from './confirm-payment-routing.module';

import { ConfirmPaymentPage } from './confirm-payment.page';

import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPaymentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfirmPaymentPage],
  providers: [
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
  ]
})
export class ConfirmPaymentPageModule {}
