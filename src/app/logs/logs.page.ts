import { Component, OnInit } from '@angular/core';
import { LogserviceService, Logs} from 'src/app/servicelog/logservice.service';
import { Observable } from 'rxjs';
declare var require: any;
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import {NavController, Platform} from '@ionic/angular'


@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  pdfObj = null;
  public log: Observable<Logs[]>;
  l: any;
  t: any;
  s: any;
  i:any;
  myDate: string;
  value:'';
  public logs: Observable<Logs[]>;
  public filter: Observable<Logs[]>;
  public loadedlogs: Observable<Logs[]>;
  public loadlogs: Observable<Logs[]>;
  constructor(
    public navCtrl: NavController,
    private plt: Platform, 
    private file: File, private fileOpener: FileOpener,
    private logService: LogserviceService) {
      this.loadlogs = this.logService.getLogs();
      this.logs = this.loadlogs;
      this.loadedlogs = this.loadlogs;
   }

  ngOnInit() {
    this.logs = this.logService.getLogs();
  }

  initilizeItems(): void{
    this.logs= this.loadedlogs;

  }

  filterListEvent(event){
    this.initilizeItems();
    console.log(event.target.value);
    const searchTerm = event.srcElement.value;

    if(!searchTerm){
      return this.loadlogs;
    }else{
      this.logs = this.logService.getLogsByName(event.target.value);
    }
  }

  createPdf() {
    this.logService.getLogs().subscribe( async response => {
      this.l = response.length;
      console.log(this.l)
      var docDefinitionAll = "";
      console.log(response);
      for(var i = 0; i <= this.l-1; i++){
        console.log(i+  " " +" "+ response [i] ['name']+ " "+ response[i]['date']+ " "+ response[i]['location']+" "+response[i]['time']);
        docDefinitionAll += response [i] ['name']+ " "+ response[i]['date']+ " "+ response[i]['location'] +" "+response[i]['time'] + "\n"
      }
      var docDefinition = {
        content: [

          {
            ul: [
              //'Bacon',
              //i=response.length,
              docDefinitionAll
            ]
          }
          
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
    });
  }
  
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  
  }

  back(){
    this.navCtrl.navigateRoot('/landing');
  }

  change(datePicker){
    var date = this.myDate;
    console.log(date);
    // console.log("datePicker",datePicker);
   
    datePicker.open();
  }
}
