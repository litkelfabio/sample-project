import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import  { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scannedData: string;
  scan: string;

  constructor(private navigation: NavController, private route: Router, private barcodeScanner: BarcodeScanner) {}

  navigate(){
    this.route.navigateByUrl('/idealist');
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData.text;
        this.scan =  barcodeData.text;
        
      })
      .catch(err => {
        console.log("Error", err);
      });


  }
}
