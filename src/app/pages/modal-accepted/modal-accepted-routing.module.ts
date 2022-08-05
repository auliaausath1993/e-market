import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAcceptedPage } from './modal-accepted.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAcceptedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAcceptedPageRoutingModule {}
