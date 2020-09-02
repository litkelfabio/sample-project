import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';
import { SMS,SmsOptions } from '@ionic-native/sms/ngx';
import { UserServiceService, User} from 'src/app/user/user-service.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  showSplash = true;
  public role:any;
  public cp:any;
  public cpn:any;
  public email: string;
  public password: string;
  public em: string;
  public pass: string;
  Users: any;
  
    user: User= {
    name: '',
    email: '',
    password: '',
    role: '',
    barangay: "",
    street: "",
    houseno: null,
    municipality: "",
    createdAt: new Date ().getTime(),
    cp:''
    };


    constructor( public router: Router, private userService: UserServiceService,
      private alertController: AlertController,
      private activatedRoute: ActivatedRoute,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar, 
      private loadingController: LoadingController,
      private sms: SMS,
      private androidPermissions: AndroidPermissions) { }


  ngOnInit() {
  }
  async forgot(){
    console.log(this.email)
    const loading =  await this.loadingController.create({
      message: "Sending"
    });
    loading.present();
    try{
    this.userService.getUserByEmail(this.email).subscribe( async response => {
    try{
    console.log(response[0]['cp'])
    this.em = response[0]['email'];
    this.pass= response[0]['password'];
    this.cp= response[0]['cp'];
    //this.idnum = response[0]['number'];
    console.log(this.cp);
    console.log(this.pass);
    console.log(this.em);
    //console.log(this.idn);
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
        await this.sms.send(this.cp,"Your Username is: "+this.em+" and your Password is: "+this.pass,options);
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

}
