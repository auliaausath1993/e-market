import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { APIURL } from 'src/app/api-url';

import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';

@Component({
  providers: [File],
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.page.html',
  styleUrls: ['./confirm-payment.page.scss'],
})
export class ConfirmPaymentPage implements OnInit {
  order_id: any;
  dataAddress: any = [];
  dataAccount: any = [];
  confirmForm: FormGroup;

  isLoadingResults = false;
  isLoading = false;

  previewImagepath: any;
  fullImagePath: any;
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(
    private route: ActivatedRoute,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private formBuilder: FormBuilder,
    public http: HttpClient,
    public toastController: ToastController,
    private fileTransfer: FileTransfer,
    private filePath: FilePath,
    private file: File,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.params.id;
    this.confirmForm = this.formBuilder.group({
      'order_id' : this.order_id,
      'token' : "8abf4902a0db27dcb7f62a01c2fd0d0a",
      'customer_id' : localStorage.getItem("customer_id"),
      'nama' : [null, Validators.required],
      'bank' : [null, Validators.required],
      'jumlah' : [null, Validators.required],
      'rekening' : [null, Validators.required],
      'bank_account' : [null, Validators.required],
    });
  }

  ionViewWillEnter() {
    this.getOngkir();
  }

  getOngkir(){
    let reqData = {
      "customer_id": localStorage.getItem("customer_id"),
      "token": "8abf4902a0db27dcb7f62a01c2fd0d0a"
    }
    this.http.post(APIURL.apiURL + 'getAccount', reqData)
    .subscribe((res) => {
      this.dataAccount = res;
      console.log(this.dataAccount);
    });
  }

  confirm_payment() {
    this.isLoadingResults = true;
    this.uploadImage();

    /*
    this.http.post(APIURL.apiURL + 'confirm_payment', this.confirmForm.value)
    .subscribe(data => {
      //console.log(reqData);
      let sts = data['status'];
      if(sts == "Failed"){
        this.toastController.create({
          message: data['message'],
          position: 'bottom',
          duration: 5000,
          buttons: [
            {
              side: 'end',
              icon: 'warning'
            }
          ]
        }).then((toast) => {
          toast.present();
        });
      }
      else{
        this.toastController.create({
          message: data['message'],
          position: 'bottom',
          duration: 5000,
          buttons: [
            {
              side: 'end',
              icon: 'checkmark-done-circle-outline'
            }
          ]
        }).then((toast) => {
          toast.present();
        });
        setTimeout(() => {
          this.router.navigate(['/list-order']);
        }, 900);
      }

    });
    */
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      if (sourceType == 0) {
        // from photo library
        this.file.resolveLocalFilesystemUrl(imageData)
          .then(entry => {
            this.fullImagePath = entry.nativeURL;
            this.previewImagepath = (<any>window).Ionic.WebView.convertFileSrc(entry.nativeURL);
          })
          .catch(err => {
            alert('Error while reading file.');
          });

      } else {
        // from camera
        this.fullImagePath = imageData;
        this.previewImagepath = (<any>window).Ionic.WebView.convertFileSrc(this.fullImagePath);
      }
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    debugger
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  /**
   * Upload image
   *
   * @return No return
   */
  uploadImage() {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    let fileName = this.fullImagePath.substr(this.fullImagePath.lastIndexOf('/') + 1);
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileName,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      params: {
        customer_id: localStorage.getItem("customer_id"),
        token: "8abf4902a0db27dcb7f62a01c2fd0d0a",
        order_id: this.order_id,
        ...this.confirmForm.value,
      }
    }

    fileTransfer.upload(this.fullImagePath, APIURL.apiURL + 'confirm_payment', options)
      .then((data) => {
        // success
        let dataObj = JSON.parse(data?.response);

        this.toastController.create({
          message: dataObj['message'],
          position: 'bottom',
          duration: 5000,
          buttons: [
            {
              side: 'end',
              icon: 'checkmark-done-circle-outline'
            }
          ]
        }).then((toast) => {
          toast.present();
        });

        setTimeout(() => {
          this.router.navigate(['/list-order']);
        }, 900);

      }, (err) => {
        // error
        console.log(err);
      });
  }

}
