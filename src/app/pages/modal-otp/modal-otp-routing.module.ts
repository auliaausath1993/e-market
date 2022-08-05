import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOtpPage } from './modal-otp.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOtpPageRoutingModule {}
