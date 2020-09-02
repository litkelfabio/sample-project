import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NavController } from '@ionic/angular';
import { LoadingController, ToastController,AlertController  } from '@ionic/angular';
import {  MenuController } from '@ionic/angular';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true;
  navigate : any;
  nav:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,  private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController, 
    private showToast: ToastController,
    public menuCtrl: MenuController
  ) {
    this.sideMenu();
    
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash=false);
    });
  }
  
  sideMenu()
  
  {
   
    this.navigate =
    [
     
      
    ]
   

    
  }
  showLogout(msg) {
    let alert = this.alertController.create({
        header: 'Confirm to Log Out',
        message: msg,
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: async () => {
                  console.log("Logout");
                 const loading = await this.loadingController.create({
                   message: 'Logging Out..',
                   duration: 5000
                 });
                 await loading.present();
                 this.navCtrl.navigateRoot('login');
                 loading.dismiss();
                }
            }
        ]
    }).then(alert => alert.present());
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }
 ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 


  logout() {
    
    this.showLogout("Are you sure do you really want to log out?");
    
  }
  
}
