import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { IdeaService, Citizen} from 'src/app/services/idea.service';
import { LogserviceService, Logs} from 'src/app/servicelog/logservice.service';
import { ToastController} from  '@ionic/angular';
import {NavController, Platform} from '@ionic/angular'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController,  AlertController } from '@ionic/angular';
import { SMS,SmsOptions } from '@ionic-native/sms/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {

  public citizen: any
  public name: any
  public cp: any
  qr = null
  location:  string;


  address: string;

  latitude: number;
  longitude: number;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  logs: Logs = {
    name: "",
    date: "",
    location: "",
    time: "",
  }

  citizens: Citizen ={
    name: "",
    barangay: "",
    street: "",
    municipality: "",
    houseno: null,
    date: null,
    status: "",
    qr: "",
    cp: "",
    imgURL:"",
    imgID:""
  }

  constructor(private ideaService: IdeaService,
     private activatedRoute: ActivatedRoute, 
     private router: Router,
     private logService: LogserviceService,
     private showToast: ToastController,
     private navCtrl: NavController,
     private loadingController: LoadingController,
     private sms: SMS,
     private androidPermissions: AndroidPermissions,
     private alertController: AlertController,
     private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
     ) 
     { this.qr = activatedRoute.snapshot.paramMap.get('qr');}

  ngOnInit() {
    this.getData();
  }

  async getData(){
    this.ideaService.getCitizenByQR(this.qr).subscribe(data => { 
    console.log(data)
    console.log(data['qr'])
    this.citizen = data[0];
    });
   
  }

  Toast(msg) {
    this.showToast.create({
      message: msg,
      duration: 1000
    }).then(toast => toast.present());
    
  }

  checkIn(){
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = Math.round(resp.coords.latitude * 100 + Number.EPSILON)/100;
      this.longitude = Math.round(resp.coords.longitude * 100 + Number.EPSILON)/100;
      console.log("latitude: " + this.latitude+ "  "+ "Longitude: " +this.longitude)

      this.getGeoencoder(this.latitude, this.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
    
    
  }
  
async  Sms(){
    console.log(this.qr)
    const loading =  await this.loadingController.create({
      message: "Sending"
    });
    loading.present();
    try{
    this.ideaService.getCitizenByQR(this.qr).subscribe( async response => {
    try{
    console.log(response[0]['cp'])
    this.name = response[0]['name'];
    this.cp= response[0]['cp'];
    console.log(this.cp);
    console.log(this.name);
    }catch(e){
      console.log(JSON.stringify(e));
      loading.dismiss();
      this.presentAlert("No Username Found!");
    }
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      result => console.log('Has permission?'+result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS )
      );
        var options: SmsOptions  = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                //intent: 'INTENT'  // send SMS with the native android SMS messaging
               intent: '' // send SMS without opening any other app
            }
        };
        loading.present();
        
        try{
          //this.cpn = '0'+ this.user.cp
        await this.sms.send(this.cp,"Name: "+this.name+" you enter this location: "+this.logs.location,options);
        console.log("sent");
        //console.log("sent to "+ this.cpn);
        this.presentAlert("Messsage sent!");
        loading.dismiss();
        }
      catch(e){
        console.log(JSON.stringify(e));
        console.log(e);
        this.presentAlert("Error! Please check your load balance");
        loading.dismiss();
      }
    
    });
  }catch(e){
    console.log(JSON.stringify(e));
    this.presentAlert("Fill Up Username");
    loading.dismiss();
  }
  
}
presentAlert(msg) {
  this.alertController.create({
    header:'Alert',
    message:msg,
    buttons: ['OK']
  }).then(alert => alert.present());
 }

 async getGeoencoder(latitude, longitude) {
  await this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult[]) => {
      this.address = this.generateAddress(result[0]);

      this.ideaService.getCitizenByQR(this.qr).subscribe(data => { 
        console.log(data)
        console.log(data['qr'])
        console.log(data[0]['qr'])
        this.citizen = data[0];
        this.logs.name= data[0]['name']
        this.logs.location= this.address
        console.log(this.logs.location)
        this.logs.date = new Date().toLocaleDateString()
        console.log(this.logs.date)
        this.logs.time = new Date().toLocaleTimeString()
        console.log(this.logs.time)
      this.logService.addLogs(this.logs).then(() => {
        this.navCtrl.navigateRoot('/logs');
        this.Sms();
        this.Toast('Logged Successfuly');
      }, err => {
        this.Toast('There was a problem logging your Citizen 😞');
      });
    });
    })
    .catch((error: any) => {
      alert('Error getting location' + JSON.stringify(error));
    });
}

//Return Comma saperated address
generateAddress(addressObj) {
  let obj = [];
  let address = "";
  for (let key in addressObj) {
    obj.push(addressObj[key]);
  }
  obj.reverse();
  for (let val in obj) {
    if (obj[val].length)
      address += obj[val] + ', ';
  }
  
  return address.slice(0, -2);
}
  

}
