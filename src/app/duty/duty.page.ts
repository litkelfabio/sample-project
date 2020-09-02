import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import  { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.page.html',
  styleUrls: ['./duty.page.scss'],
})
export class DutyPage implements OnInit {

  scannedData: string;
  scan: string;


  constructor(private navigation: NavController, private route: Router, private barcodeScanner: BarcodeScanner,
    public menuCtrl: MenuController) {}

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

  ngOnInit() {
    this.menuCtrl.enable(true, 'third');
  }

}
