import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import  { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {  MenuController } from '@ionic/angular';
import { IdeaService, Citizen} from 'src/app/services/idea.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  scannedData: string;
  scan: string;

  pui;
  covid;
  no;
  all;
  
  constructor(private navigation: NavController, private route: Router, private barcodeScanner: BarcodeScanner,
    public menuCtrl: MenuController, private ideaService: IdeaService) {}

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
    this.menuCtrl.enable(true, 'first');
    this.ideaService.getCitizenPui().subscribe(data =>{
      this.pui = data.length;
    });
    this.ideaService.getCitizenCovid().subscribe(data =>{
      this.covid = data.length;
    });
    this.ideaService.getCitizenNoCovid().subscribe(data =>{
      this.no = data.length;
    });
    this.ideaService.getAllCitizens().subscribe(data =>{
      this.all = data.length;
      console.log(data.length)
    });
  }

}
