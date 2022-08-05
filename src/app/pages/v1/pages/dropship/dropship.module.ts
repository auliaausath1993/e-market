import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropshipPageRoutingModule } from './dropship-routing.module';

import { DropshipPage } from './dropship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropshipPageRoutingModule
  ],
  declarations: [DropshipPage]
})
export class DropshipPageModule {}
