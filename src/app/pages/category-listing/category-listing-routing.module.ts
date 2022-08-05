import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListingPage } from './category-listing.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryListingPageRoutingModule {}
