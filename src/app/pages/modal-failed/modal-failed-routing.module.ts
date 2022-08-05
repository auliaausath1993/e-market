import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFailedPage } from './modal-failed.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFailedPageRoutingModule {}
