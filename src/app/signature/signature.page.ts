import { Component, OnInit, ViewChild } from '@angular/core';
// import { NavController} from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
// import { CustomerRegistrationPage } from '../customer/customer-registration/customer-registration.page'
import { SignatureUiService } from './signature-ui.service';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 640,
    'canvasHeight': 200
  };
  public signatureImage: string;

  constructor(
    private signatureUiService: SignatureUiService
  ) { }

  ngOnInit() {
  }

  // drawCancel() {
  //   //this.navCtrl.push(CustomerRegistrationPage);
  //   this.navCtrl.navigateForward('customer-registration');
  // }

  drawComplete() {
    //this.signatureUiService.signatureImageUrl = this.signaturePad.toDataURL();
    //console.log(this.signaturePad.toDataURL());
    //this.signatureImage = this.signaturePad.toDataURL();
    //this.signatureUiService.setSignatureUrl(this.signatureImage);
    //this.navCtrl.navigateForward('customer-registration/' + this.signatureImage);
    //this.navCtrl.push(CustomerRegistrationPage, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }

  //   canvasResize() {
  //     let canvas = document.querySelector('canvas');
  //     this.signaturePad.set('minWidth', 1);
  //     this.signaturePad.set('canvasWidth', canvas.offsetWidth);
  //     this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  //   }

  // ngAfterViewInit() {
  //       this.signaturePad.clear();
  //       this.canvasResize();
  // }

}
