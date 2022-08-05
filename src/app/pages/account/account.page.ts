import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  menu = [
    {
      icon: 'cart-outline',
      title: 'My Shopping Cart',
      action: "shoppingChart()"
    },
    {
      icon: 'document-outline',
      title: 'My Orders',
      action: "myOrder()"
    },
    {
      icon: 'map-outline',
      title: 'My Addresses',
      action: "myAddress()"
    },
    {
      icon: 'card-outline',
      title: 'My Payments Methods',
      action: "myPayments()"
    },
    {
      icon: 'settings-outline',
      title: 'App Settings',
      action: "appSetting()"
    },
  ];

  customer_name: string;
  customer_email: string;
  constructor(private router: Router, private alertController: AlertController) {
  }

  ngOnInit() {
    this.customer_name = localStorage.getItem('customer_name');
    this.customer_email = localStorage.getItem('customer_email');
    this.isLogging();
  }

  isLogging(){
    this.customer_name = localStorage.getItem('customer_name');
    this.customer_email = localStorage.getItem('customer_email');
    console.log("Email: "+ this.customer_email);
    if(this.customer_name==null && this.customer_email==null){
      this.router.navigate(['/signup']);
    }
    else{
      return false;
    }
  }
  signOut() {
    this.showConfirm();
  }

  appSetting() {
    console.log('Apps Setting');
  }
  myPayments() { console.log('My Payments'); }
  myAddress() { console.log('My Address'); }
  /* myOrder() {
    this.router.navigate(['tabs/cart']);
  } */
  myOrder() {
    this.router.navigate(['/list-order']);
  }

  shoppingChart() {
    this.router.navigate(['tabs/cart']);
  }


  showConfirm() {
    this.alertController.create({
      header: 'Konfirmasi',
      cssClass:'my-custom-class',
      message: 'Apakah anda yakin untuk signout ?',
      buttons: [
        {
          text: 'Batal',
          handler: () => {
          }
        },
        {
          text: 'Signout',
          handler: () => {
            this.router.navigate(['/onboarding']);
            localStorage.removeItem('customer_id');
            localStorage.removeItem('customer_name');
            localStorage.removeItem('customer_email');
            localStorage.clear();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
