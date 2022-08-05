import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropshipPage } from './dropship.page';

const routes: Routes = [
  {
    path: '',
    component: DropshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropshipPageRoutingModule {}
