import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryListingPageRoutingModule } from './category-listing-routing.module';
import { CategoryListingPage } from './category-listing.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryListingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CategoryListingPage]
})
export class CategoryListingPageModule {}
