import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-failed',
    loadChildren: () => import('./pages/modal-failed/modal-failed.module').then( m => m.ModalFailedPageModule)
  },
  {
    path: 'modal-accepted',
    loadChildren: () => import('./pages/modal-accepted/modal-accepted.module').then( m => m.ModalAcceptedPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'listing',
    loadChildren: () => import('./pages/category-listing/category-listing.module').then( m => m.CategoryListingPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./pages/filters/filters.module').then( m => m.FiltersPageModule)
  },
  {
    path: 'all-product',
    loadChildren: () => import('./pages/all-product/all-product.module').then( m => m.AllProductPageModule)
  },
  {
    path: 'modal-otp',
    loadChildren: () => import('./pages/modal-otp/modal-otp.module').then( m => m.ModalOtpPageModule)
  },
  {
    path: 'dropship',
    loadChildren: () => import('./pages/dropship/dropship.module').then( m => m.DropshipPageModule)
  },
  
  {
    path: 'order-detail',
    loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'confirm-payment',
    loadChildren: () => import('./pages/confirm-payment/confirm-payment.module').then( m => m.ConfirmPaymentPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./pages/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'list-order',
    loadChildren: () => import('./pages/list-order/list-order.module').then( m => m.ListOrderPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
