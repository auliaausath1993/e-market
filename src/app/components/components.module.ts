import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SelectableBtnComponent } from './selectable-btn/selectable-btn.component';
import { ProductCategoryCardComponent } from './product-category-card/product-category-card.component';
import { ProductAllCardComponent } from './product-all-card/product-all-card.component';
@NgModule({
  declarations: [
    CartItemComponent,
    FavoriteItemComponent,
    ProductCardComponent,
    ProductCategoryComponent,
    ProductGroupComponent,
    DropdownComponent,
    SelectableBtnComponent,
    ProductCategoryCardComponent,
    ProductAllCardComponent
  ],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [
    CartItemComponent,
    FavoriteItemComponent,
    ProductCardComponent,
    ProductCategoryComponent,
    ProductGroupComponent,
    DropdownComponent,
    SelectableBtnComponent,
    ProductCategoryCardComponent,
    ProductAllCardComponent
  ],
})
export class ComponentsModule {}
